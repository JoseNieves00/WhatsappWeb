import { getDocs, query, where, collection } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from './firebase'; // Importa la instancia de Firebase y Firestore desde tu archivo firebase.js

export const aLogin = async (email, password) => {
  try {
    // Autenticar al usuario usando Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Realizar una consulta para buscar al usuario en Firestore por correo electrónico
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 1) {
      // Un usuario con el correo electrónico proporcionado existe en Firestore
      const userData = querySnapshot.docs[0].data();
      return { user, userData };
    } else {
      // No se encontró un usuario en Firestore con el correo electrónico proporcionado
      console.log('Usuario no encontrado en Firestore');
      return null;
    }
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    return null;
  }
};
