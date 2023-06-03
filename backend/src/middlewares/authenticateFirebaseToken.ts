import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import * as serviceAccount from "../config/serviceAccountKey.json";

// Initialize Firebase Admin SDK
admin.initializeApp({
    // Your Firebase admin SDK configuration
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

interface CustomRequest extends Request {
    user?: any;
}

const authenticateFirebaseToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authorization.split(" ")[1];
        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = decodedToken; // Attach the user object to the request

        next();
    } catch (error: any) {
        console.error("Error authenticating Firebase token:", error);
        return res.status(403).json({ message: "Forbidden" });
    }
};

export default authenticateFirebaseToken;
