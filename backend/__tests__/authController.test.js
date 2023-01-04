const request = require('supertest')
const app = require('../index')

describe("POST /api/auth/login", () => {
    describe('if body is empty', () => {
        test('test if email and password is empty', async () => {
            let body = {
                email: "", password: ""
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.body.erreur).toBe("Not found user with this email")
        })
    })

    describe('if body is not empty', () => {
        test('test if email not exist in database', async () => {
            let body = {
                email: "mohamed@gmail.com", password: "dsdsdsdsdsd"
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.body.erreur).toBe("Not found user with this email")
        })

        test('test if password incorect', async () => {
            let body = {
                email: "moundirjabir@icloud.com", password: "ghghghghghghghg"
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.body.erreur).toBe("Incorect password")
        })

        test('test if password correct', async () => {
            let body = {
                email: "moundirjabir@icloud.com", password: "Kinematic1@"
            }
            const response = await request(app).post('/api/auth/login').send(body)
            expect(response.statusCode).toBe(200)
        })
    })
})