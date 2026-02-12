import fs from "fs/promises"
import path from "path"

let _prismaPromise: Promise<any> | null = null

async function tryGetPrismaClient() {
	if (!_prismaPromise) {
		_prismaPromise = import("@prisma/client")
			.then((mod) => {
				const Client = (mod as any).PrismaClient || (mod as any).default?.PrismaClient || (mod as any).default
				return new Client()
			})
			.catch(() => null)
	}
	return _prismaPromise
}

const DB_PATH = path.resolve(process.cwd(), "dev-data.json")

async function readDb() {
	try {
		const txt = await fs.readFile(DB_PATH, "utf8")
		return JSON.parse(txt)
	} catch {
		const init = { users: [], tasks: [] }
		await fs.writeFile(DB_PATH, JSON.stringify(init, null, 2))
		return init
	}
}

async function writeDb(db: any) {
	await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
}

function uuid() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}

function createFallback() {
	return {
		user: {
			async findUnique({ where }: any) {
				const db = await readDb()
				if (where?.email) return db.users.find((u: any) => u.email === where.email) || null
				if (where?.id) return db.users.find((u: any) => u.id === where.id) || null
				return null
			},
			async create({ data }: any) {
				const db = await readDb()
				const user = { id: uuid(), email: data.email, password: data.password, createdAt: new Date().toISOString() }
				db.users.push(user)
				await writeDb(db)
				return user
			},
		},
		task: {
			async findMany({ where, orderBy }: any) {
				const db = await readDb()
				let tasks = db.tasks.filter((t: any) => (where?.userId ? t.userId === where.userId : true))
				if (orderBy?.createdAt === "desc") tasks = tasks.sort((a: any, b: any) => (a.createdAt < b.createdAt ? 1 : -1))
				return tasks
			},
			async create({ data }: any) {
				const db = await readDb()
				const task = { id: uuid(), title: data.title, status: data.status ?? "TODO", userId: data.userId, createdAt: new Date().toISOString() }
				db.tasks.push(task)
				await writeDb(db)
				return task
			},
			async updateMany({ where, data }: any) {
				const db = await readDb()
				let count = 0
				db.tasks = db.tasks.map((t: any) => {
					if (t.id === where?.id && t.userId === where?.userId) {
						count++
						return { ...t, ...data }
					}
					return t
				})
				await writeDb(db)
				return { count }
			},
			async deleteMany({ where }: any) {
				const db = await readDb()
				const before = db.tasks.length
				db.tasks = db.tasks.filter((t: any) => !(t.id === where?.id && t.userId === where?.userId))
				const after = db.tasks.length
				await writeDb(db)
				return { count: before - after }
			},
		},
	}
}

function createProxy(target: any) {
	return new Proxy(target, {
		get(t, prop: string) {
			return (t as any)[prop]
		},
	})
}

export const prisma = createProxy({
	async _get() {
		const client = await tryGetPrismaClient()
		if (client) return client
		return createFallback()
	},
	// delegate user/task access lazily
	get user() {
		const p = this as any
		return new Proxy({}, {
			get(_t, method: string) {
				return async (...args: any[]) => {
					const real = await p._get()
					return (real.user as any)[method](...args)
				}
			}
		})
	},
	get task() {
		const p = this as any
		return new Proxy({}, {
			get(_t, method: string) {
				return async (...args: any[]) => {
					const real = await p._get()
					return (real.task as any)[method](...args)
				}
			}
		})
	}
} as any)
