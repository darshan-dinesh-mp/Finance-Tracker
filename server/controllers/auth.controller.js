import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config.js";


export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        const userData = {
            name,
            email: user.email,
            uid: user.uid,
            createdAt: new Date(),
        };
        await setDoc(doc(db, "users", user.uid), userData);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Optional: Retrieve additional user data from Firestore if needed
        // const userDoc = await getDoc(doc(db, "users", user.uid));
        // const userData = userDoc.data();

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};