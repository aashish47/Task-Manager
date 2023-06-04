import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import * as serviceAccount from "../config/serviceAccountKey.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export interface CustomRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

const authenticateFirebaseToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authorization.split(" ")[1];
        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = decodedToken;

        next();
    } catch (error: any) {
        console.error("Error authenticating Firebase token:", error);
        return res.status(403).json({ code: error.code, message: error.message });
    }
};

export default authenticateFirebaseToken;
