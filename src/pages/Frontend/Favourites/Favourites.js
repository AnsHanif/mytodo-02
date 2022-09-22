import React, { useState, useContext, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore/lite";
import { firestore } from "../../../config/firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Favourites.css";
import { AuthContext } from "../../context/AuthContext";

export default function Favourites() {
  const [documents, setdocuments] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const { isAuthenticated, setisAuthenticated, user } = useContext(AuthContext);

  const collectionName = "todos";
  const docsCollectionRef = collection(firestore, collectionName);
  const readDocs = async () => {
    let array = [];
    const q = query(docsCollectionRef, where("useruid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      array.push({ ...doc.data(), id: doc.id });
    });
    setdocuments(array);
  };
  useEffect(() => {
    readDocs();
  }, []);

  const handleDelete = async (t) => {
    setisLoading(true)
    const delFav = doc(firestore, "todos",t.id );
      await updateDoc(delFav, {
        isFav: deleteField(),
      });
      toast.success("Remove From Favourites", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      let newDocuments = documents.map((doc) => {
        if (doc.id === t.id) {
          let data = { ...t };
          delete data.isFav;
          return data;
        } else {
          return doc;
        }
      });
  
      setdocuments(newDocuments);
      setisLoading(false)
  };
  return (
    <div className="d-flex justify-content-center align-items-center  min-vh-100">
      <div className="container">
        <div className="row d-flex">
          <div className="col d-flex justify-content-center">
            <div className="card Favcard">
              <div className="card-body text-center F1">
                <h1 className="p-4 head1">
                  FAVOURITES <i class="fas fa-star text-white"></i>
                </h1>
                <div className="pb-5" style={{ backgroundColor: "#f8b500" }}>
                  {!documents.length == "" ? (
                    documents.map((t, i) => {
                      return (
                        t.isFav && (
                          <ul class="list-group">
                            <li class="list-group-item m-1">
                              <>
                                <p className="d-flex">
                                  <h5 className="p5"> {t.title} </h5>
                                  <p className="p5">
                                  {isLoading ? (
                                      <div>
                                        <div
                                          class="spinner-border text-warning"
                                          role="status"
                                        >
                                          <span class="sr-only">
                                            Loading...
                                          </span>
                                        </div>
                                      </div>
                                    ) : (
                                    <i
                                      class="fas fa-star text-warning"
                                      onClick={() => {
                                        handleDelete(t);
                                      }}
                                    ></i>
                                    )}
                                  </p>
                                </p>
                                <hr />
                                <p> {t.description}</p>
                              </>
                            </li>
                          </ul>
                        )
                      );
                    })
                  ) : (
                    <h5 className="text-white">You Don't Have Any Favourite</h5>
                  )}
                </div>
                <p className="card-text text-center">
                  <Link
                    to="/frontend/"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <i class="fas fa-arrow-left"></i> Back To Home Page
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
