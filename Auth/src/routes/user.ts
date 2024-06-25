import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { singInInput, singupInput } from "@naveen-g09/zod-medium-types";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

const AccessTokenExpiry = Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60); // 3 days in seconds

const RefreshTokenExpiry = Math.floor(Date.now() / 1000) + (31 * 24 * 60 * 60); // 31 days in seconds


const currentTimeStamp = Math.floor(Date.now() / 1000);


userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success, data } = singInInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const existingUser = await prisma.user.findUnique({
        where: {
            username: data.username,
        },
    });

    if (existingUser) {
        c.status(409); 
        return c.json({
            message: "Username already exists"
        });
    }

    try {
        const user = await prisma.user.create({
            data: {
                username: data.username,
                password: data.password,
                name: body.name,
            }
        })
        const secret = c.env.JWT_SECRET;

        const accessTokenPayload = {
            id: user.id,
            exp: AccessTokenExpiry
        }

        const refreshTokenPayload = {
            id: user.id,
            exp: RefreshTokenExpiry
        }

        const AccessToken = await sign(accessTokenPayload, secret);
        const RefreshToken = await sign(refreshTokenPayload, secret);

        return c.json({
            AccessToken: AccessToken,
            RefreshToken: RefreshToken,
            ACCESS_TOKEN_EXPIRES_IN: AccessTokenExpiry,
        })

    } catch (e) {
        console.log(e);
        c.status(500);
        return c.text('Internal Server Error')
    }
})


userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = singupInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            message: "Inputs are not correct"
        })
    }

    const { username, password } = body;

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
                password: password,
            }
        })
        if (!user) {
            c.status(401);
            return c.json({
                message: "Incorrect credentials"
            })
        }

        const secret = c.env.JWT_SECRET;


        const accessTokenPayload = {
            id: user.id,
            exp: AccessTokenExpiry
        }

        const refreshTokenPayload = {
            id: user.id,
            exp: RefreshTokenExpiry
        }

        const AccessToken = await sign(accessTokenPayload, secret);
        const RefreshToken = await sign(refreshTokenPayload, secret);

        return c.json({
            AccessToken: AccessToken,
            RefreshToken: RefreshToken,
            ACCESS_TOKEN_EXPIRES_IN: AccessTokenExpiry,
        })

    } catch (e) {
        console.log(e);
        c.status(411);
        return c.text('Invalid')
    }
})

userRouter.post('/refresh', async (c) => {
    const { refreshToken } = await c.req.json();
    const tokenToVerify = refreshToken;
    const secret = c.env.JWT_SECRET;

    if (!refreshToken) {
        c.status(411);
        return c.json({
            message: "No refresh token Provided"
        })
    }

    try {
        const decoded = await verify(tokenToVerify, secret);

        if (!decoded || !decoded.id) {
            c.status(403);
            return c.json({
                message: "Invalid token"
            })
        }

        if (decoded.exp && decoded.exp < currentTimeStamp) {
            c.status(411);
            return c.json({
                message: "Token expired"
            })
        }



        const accessToken = await sign({
            id: decoded.id,
            exp: AccessTokenExpiry
        }, secret);

        const refreshToken = await sign({
            id: decoded.id,
            exp: RefreshTokenExpiry
        }, secret);

        return c.json({
            accessToken,
            refreshToken,
            accessTokenExpiry: AccessTokenExpiry,
        })

    } catch (e) {
        console.log(e);
        c.status(411);
        return c.text('Invalid')
    }
}
)