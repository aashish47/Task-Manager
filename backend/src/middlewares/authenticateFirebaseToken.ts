import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import * as serviceAccount from "../../keys/serviceAccountKey.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

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
