import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCksetmQe_ec2BH6g5MKqQU_1K1U6htmww",
  authDomain: "data-7d32f.firebaseapp.com",
  projectId: "data-7d32f",
  storageBucket: "data-7d32f.appspot.com",
  messagingSenderId: "156748846014",
  appId: "1:156748846014:web:4269883b14bdb400b2dfef",
  measurementId: "G-W3SBB85TF1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambildaftarsiswa() {
  const refDokumen = collection(db, "Absensi_siswa");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikankueri = await getDocs(kueri);
  
  let hasil = [];
  cuplikankueri.forEach((dok) => {
    hasil.push({ 
      id: dok.id, 
      tanggal: dok.data().tanggal,
      nis:dok.data().nis,
      nama:dok.data().nama,
      alamat:dok.data().alamat,
      notlpn:dok.data().notlpn,
      kelas:dok.data().kelas,
      keterangan:dok.data().keterangan,
      });
  });
  
  return hasil;
}


export async function tambahsiswa(tanggal, nis, nama, alamat, notlpn, kelas, keterangan) {
  try {
    const dokRef = await addDoc(collection(db, 'Absensi_siswa'), {
      tanggal:tanggal,
      nis:nis,
      nama:nama,
      alamat:alamat,
      notlpn:notlpn,
      kelas:kelas,
      keterangan:keterangan,
    });
    console.log('berhasil menembah siswa ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah siswa ' + e);
  }
}


export async function hapusAbsensi(docId) {
  await deleteDoc(doc(db, "Absensi_siswa", docId));
}

export async function ubahAbsensi(docId, tanggal, nis, nama, alamat, noTlpn, kelas, keterangan) {
  await updateDoc(doc(db, "Absensi_siswa", docId), {
    tanggal: tanggal,
    nis: nis,
    nama: nama,
    alamat: alamat,
    notlpn: notlpn,
    kelas: kelas,
    keterangan: keterangan
  });
}

export async function ambilAbsensi(docId) {
  const docRef = await doc(db, "Absensi_siswa", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}
