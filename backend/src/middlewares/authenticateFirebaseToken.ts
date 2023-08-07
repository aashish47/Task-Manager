import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";

const serviceAccountKeyString = process.env.SERVICE_ACCOUNT_KEY;

if (serviceAccountKeyString) {
    const serviceAccount = JSON.parse(serviceAccountKeyString);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
} else {
    console.error("SERVICE_ACCOUNT_KEY is not set in the environment.");
}

export interface CustomRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

export const authenticateFirebaseToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        const decodedToken = await authenticateToken(authorization);

        req.user = decodedToken;

        next();
    } catch (error: any) {
        console.error("Error authenticating Firebase token:", error);
        return res.status(403).json({ code: error.code, message: error.message });
    }
};

export const authenticateToken = async (authorization: string | undefined) => {
    if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new Error("Unauthorized");
    }

    const token = authorization.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
};
