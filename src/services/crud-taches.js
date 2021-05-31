import firebase from 'firebase/app';
import { collUtil, collTaches } from './config';
import { instanceFirestore } from './firebase-initialisation';
import 'firebase/firestore';

/**
 * Créer une nouvelle tâche pour l'utilisateur connecté
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @param {Object} tache document à ajouter aux tâches de l'utilisateur
 * @returns {Promise<null>} Promesse sans paramètre
 */

//Le compteur compte tous les tâches, même ceux qui sont déjà complétée... (Non fonctionelle)
 export var compteur = 0;
 export var etat = "tout";

export async function creer(uid, tache) {
  // On ajoute la propriété 'date' à l'objet représentant la tâche en prenant la 
  // date du serveur Firestore.
  tache.date = firebase.firestore.FieldValue.serverTimestamp();
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches).add(tache).then(
      tacheRef => tacheRef.get()
    ).then(
      compteur += 1
    );
}

export async function supprimer(uid, idDossier){
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches).doc(idDossier).delete().then(compteur -= 1);
}

export async function supprimerCompletee(uid){
  var refDocDelete = instanceFirestore.collection(collUtil).doc(uid).collection(collTaches).where("completee", "==", true);
  //Pour chaque document de la collection de document ou completee = true, le delete.... (Non fonctionnelle)
  return refDocDelete.get().then(
    reponse => reponse.forEach(
      doc =>{
        doc.delete()
      }
    ))

  
}


export async function basculer(uid, idDossier, completee){
  
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
    .doc(idDossier).update({completee:!completee});

}


/**
 * Obtenir toutes les tâches d'un utilisateur
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @returns {Promise<any[]>} Promesse avec le tableau des tâches
 */
export async function lireTout(uid) {
  const taches = [];
  if(etat === "tout"){
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches).orderBy('completee', 'desc').orderBy('date', 'asc')
                .get().then(
                  reponse => reponse.forEach(
                    doc => {
                      taches.push({id: doc.id, ...doc.data()});
                      compteur += 1;
                    }
                  )
                ).then(
                  () => taches
                );
  }
  if(etat === "completee"){
    return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches).where("completee", "==", true)
                .get().then(
                  reponse => reponse.forEach(
                    doc => {
                      taches.push({id: doc.id, ...doc.data()});
                      compteur += 1;
                    }
                  )
                ).then(
                  () => taches
                );
  }
  if(etat === "active"){
    return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches).where("completee", "==", false)
                .get().then(
                  reponse => reponse.forEach(
                    doc => {
                      taches.push({id: doc.id, ...doc.data()});
                      compteur += 1;
                    }
                  )
                ).then(
                  () => taches
                );
  }
}

export async function mettreTout(){
  etat = "tout";
  alert("L'état est basculé à '" +  etat + "' mais la fonction liretout n'est pas rappelée...");
}
export async function mettreCompletee(){
  etat= "completee";
  alert("L'état est basculé à '" +  etat + "' mais la fonction liretout n'est pas rappelée...");
}
export async function mettreActives(){
  etat = "active"
  alert("L'état est basculé à '" +  etat + "' mais la fonction liretout n'est pas rappelée...");
}
