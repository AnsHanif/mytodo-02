import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  setDoc,
  serverTimestamp,
  updateDoc,
  deleteField,
} from "firebase/firestore/lite";
import { firestore } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HeatMap from "@uiw/react-heat-map";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const { isAuthenticated, setisAuthenticated, user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading4, setIsLoading4] = useState(false);
  const [LoaderChecker1, setLoaderChecker1] = useState();
  const [LoaderChecker2, setLoaderChecker2] = useState();
  const [LoaderChecker3, setLoaderChecker3] = useState();
  const [LoaderChecker4, setLoaderChecker4] = useState();
  const [LoaderChecker5, setLoaderChecker5] = useState();
  const [refreshLoader, setrefreshLoader] = useState(true);
  const [UpdateTodoId, setUpdateTodoId] = useState({});
  const [value, onChange] = useState(new Date());
  const [documents, setdocuments] = useState([]);
  const [newTitle, setnewTitle] = useState("");
  const [newDescription, setnewDescription] = useState("");

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
    setrefreshLoader(false);
  };
  useEffect(() => {
    readDocs();
  }, []);
  const navigate = useNavigate();
  const logoutUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        navigate("/");
        toast.success("You are Loged Out Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error("Error While Logging Out", error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteDocument = async (document) => {
    setLoaderChecker5(document.id);
    setIsLoading4(true);
    await deleteDoc(doc(firestore, collectionName, document.id));
    toast.success("Todo Deleted Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setIsLoading4(false);
    let newArray = documents.filter((t) => {
      return t.id !== document.id;
    });
    setdocuments(newArray);
  };

  const values = [
    { date: "2016/01/11", count: 2 },
    { date: "2016/01/12", count: 20 },
    { date: "2016/01/13", count: 10 },
    ...[...Array(17)].map((_, idx) => ({
      date: `2016/02/${idx + 10}`,
      count: idx,
      content: "",
    })),
    { date: "2016/04/11", count: 2 },
    { date: "2016/05/01", count: 5 },
    { date: "2016/05/02", count: 5 },
    { date: "2016/05/04", count: 11 },
  ];

  const collName = "Favourites";

  const addToFav = async (todo) => {
    setIsLoading2(true);
    setLoaderChecker1(todo.id);
    console.log(todo);
    let formData = { isFav: true, dateAddedInFav: serverTimestamp() };
    try {
      await setDoc(doc(firestore, "todos", todo.id), formData, { merge: true });

      console.log("todo updated");
      toast.success("Added In Favourites", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      let newDocuments = documents.map((doc) => {
        if (doc.id === todo.id) {
          let data = { ...todo, ...formData };
          return data;
        } else {
          return doc;
        }
      });

      setdocuments(newDocuments);
    } catch (e) {
      alert("error while adding Fav", e);
      console.error(e);
    } finally {
      setIsLoading2(false);
    }
  };
  const addToCheck = async (todo) => {
    setLoaderChecker3(todo.id);
    setIsLoading3(true);
    console.log(todo);
    let formData = { isCheck: true };
    try {
      await setDoc(doc(firestore, "todos", todo.id), formData, { merge: true });

      console.log("todo updated");
      toast.success("Added In Completes", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      let newDocuments = documents.map((doc) => {
        if (doc.id === todo.id) {
          let data = { ...todo, ...formData };
          return data;
        } else {
          return doc;
        }
      });

      setdocuments(newDocuments);
    } catch (e) {
      alert("error while adding Check", e);
      console.error(e);
    } finally {
      setIsLoading3(false);
    }
  };
  const handleFav = async (t) => {
    setIsLoading2(true);
    setLoaderChecker2(t.id);
    const delFav = doc(firestore, "todos", t.id);
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

    setIsLoading2(false);
  };

  const handleCheck = async (t) => {
    setLoaderChecker4(t.id);
    setIsLoading3(true);
    const delCheck = doc(firestore, "todos", t.id);
    await updateDoc(delCheck, {
      isCheck: deleteField(),
    });
    toast.success("Remove From Complete List", {
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
        delete data.isCheck;
        return data;
      } else {
        return doc;
      }
    });

    setdocuments(newDocuments);

    setIsLoading3(false);
  };

  const handleUpdate = async (todo) => {
    let formData = {
      title: newTitle,
      description: newDescription,
      dateAddedInFav: serverTimestamp(),
    };
    try {
      await setDoc(doc(firestore, "todos", todo.id), formData, { merge: true });

      // console.log("todo updated");
      toast.success("Todo Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      let newDocuments = documents.map((doc) => {
        if (doc.id === todo.id) {
          let data = { ...todo, ...formData };
          return data;
        } else {
          return doc;
        }
      });

      setdocuments(newDocuments);
    } catch (e) {
      alert("error while Updating Todo");
      console.error(e);
    }
  };

  return (
    <div>
      <div className="main">
        <div className="left pt-4">
          <div className="pb-5">
            <i class="fas fa-th-list i2 text-warning"></i>{" "}
            <span className="s1">TODOS SITE</span>
          </div>
          <div className="divSide">
            <div>
              <p
                className="border m-4 "
                style={{ borderRadius: 10, backgroundColor: "#F2F2F2" }}
              >
                <Link to="/frontend/">
                  <i class="fas fa-clipboard text-primary"></i>{" "}
                  <span className="text-primary side">Today</span>
                </Link>
              </p>
              <p
                className="border m-4 "
                style={{ borderRadius: 10, backgroundColor: "#F2F2F2" }}
              >
                <Link to="/frontend/favourites">
                  <i class="fas fa-star text-warning"></i>{" "}
                  <span className="side">Favourites</span>
                </Link>
              </p>
              <p
                className="border m-4 "
                style={{ borderRadius: 10, backgroundColor: "#F2F2F2" }}
              >
                <Link to="/frontend/completes">
                  <i class="fas fa-check-circle text-success"></i>{" "}
                  <span className="side">Completed</span>
                </Link>
              </p>
              <p
                className="border m-4 "
                style={{ borderRadius: 10, backgroundColor: "#F2F2F2" }}
              >
                <Link to="/frontend/add">
                  <i className="fas fa-plus-square text-dark"></i>{" "}
                  <span style={{ color: "black" }} className="side">
                    Add Todo
                  </span>
                </Link>
              </p>
            </div>
            <div>
              <p
                className="border m-4 mt-5"
                style={{ borderRadius: 10, backgroundColor: "#F2F2F2" }}
                onClick={logoutUser}
              >
                {isLoading ? (
                  <div>
                    <div class="spinner-border  text-warning" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <i class="fas fa-sign-out-alt text-danger"></i>
                    <span className="side">Logout</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="center2 shadow pt-4">
          <div className="Top">
            <p className="i1 pt-3">
              <i class="fa-solid fa-angle-left border p-1"></i> Archive
            </p>
            <p className="p1">Today</p>
            <p className="i1 pt-3">
              This Week <i class="fa-solid fa-angle-right border p-1"></i>
            </p>
          </div>
          <div className="todos">
            <p>
              <span style={{ fontWeight: "bold" }}>TODOS</span>
            </p>
            <div>
              {refreshLoader ? (
                <div className="text-center text-warning">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  {!documents.length == "" ? (
                    documents.map((t, i) => {
                      return (
                        <div className="accordion pb-2">
                          <div className="accordion-item">
                            <h5 className="accordion-header" id={`heading${i}`}>
                              <button
                                className="accordion-button w-100 btn1 btn2"
                                style={
                                  t.isCheck
                                    ? {
                                      backgroundColor: "green",
                                      color: "white",
                                    }
                                    : { backgroundColor: "white" }
                                }
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${i}`}
                                aria-expanded="true"
                                aria-controls={`collapse${i}`}
                              >
                                <p className="p2">
                                  <i class="fas fa-clipboard-list text-warning"></i>{" "}
                                  {t.title}
                                </p>
                                <p className="p3">
                                  <i class="fas fa-angle-down"></i>
                                </p>
                              </button>
                            </h5>
                            <div
                              id={`collapse${i}`}
                              className="accordion-collapse p-1 A1"
                              aria-labelledby={`heading${i}`}
                              data-bs-parent="#accordionExample"
                            // style={{paddingTop: -5}}
                            >
                              <div
                                className="accordion-body pb-1 pr-3 pl-3 pt-1"
                                style={{
                                  // border: "1px solid black",
                                  // borderTop: "none",
                                  backgroundColor: "white",
                                }}
                              >
                                {t.description}

                                <div className="d-flex text-center">
                                  <p className=" m-1  p5">
                                    {t.isCheck ? (
                                      <>
                                        {isLoading3 ? (
                                          t.id == LoaderChecker4 ? (
                                            <div>
                                              <div
                                                class="spinner-border text-success spinner-border-sm"
                                                role="status"
                                              >
                                                <span class="sr-only">
                                                  Loading...
                                                </span>
                                              </div>
                                            </div>
                                          ) : (
                                            <i class="fas fa-check-circle text-success"></i>
                                          )
                                        ) : (
                                          <i
                                            class="fas fa-check-circle text-success"
                                            onClick={() => {
                                              handleCheck(t);
                                            }}
                                          ></i>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {isLoading3 ? (
                                          t.id == LoaderChecker3 ? (
                                            <div>
                                              <div
                                                class="spinner-border text-success spinner-border-sm"
                                                role="status"
                                              >
                                                <span class="sr-only">
                                                  Loading...
                                                </span>
                                              </div>
                                            </div>
                                          ) : (
                                            <i class="fa-regular fa-circle"></i>
                                          )
                                        ) : (
                                          <i
                                            class="fa-regular fa-circle"
                                            onClick={() => {
                                              addToCheck(t);
                                            }}
                                          ></i>
                                        )}
                                      </>
                                    )}
                                  </p>
                                  <p className=" m-1  p5">
                                    {t.isFav ? (
                                      <>
                                        {isLoading2 ? (
                                          t.id == LoaderChecker2 ? (
                                            <div>
                                              <div
                                                class="spinner-border text-warning spinner-border-sm"
                                                role="status"
                                              >
                                                <span class="sr-only">
                                                  Loading...
                                                </span>
                                              </div>
                                            </div>
                                          ) : (
                                            <i class="fas fa-star text-warning"></i>
                                          )
                                        ) : (
                                          <i
                                            class="fas fa-star text-warning"
                                            onClick={() => {
                                              handleFav(t);
                                            }}
                                          ></i>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {isLoading2 ? (
                                          t.id == LoaderChecker1 ? (
                                            <div>
                                              <div
                                                class="spinner-border text-warning spinner-border-sm"
                                                role="status"
                                              >
                                                <span class="sr-only">
                                                  Loading...
                                                </span>
                                              </div>
                                            </div>
                                          ) : (
                                            <i class="far fa-star"></i>
                                          )
                                        ) : (
                                          <i
                                            class="far fa-star"
                                            onClick={() => {
                                              addToFav(t);
                                            }}
                                          ></i>
                                        )}
                                      </>
                                    )}
                                  </p>
                                  <p className="m-1 p5">
                                    {/* <!-- Button trigger modal --> */}
                                    <i
                                      class="fa-regular fa-pen-to-square"
                                      onClick={() => {
                                        setUpdateTodoId(t);
                                      }}
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                    ></i>

                                    {/* <!-- Modal --> */}
                                    <div
                                      class="modal fade"
                                      id="exampleModal"
                                      tabindex="-1"
                                      aria-labelledby="exampleModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div class="modal-dialog">
                                        <div class="modal-content">
                                          <div class="modal-header">
                                            <h5
                                              class="modal-title"
                                              id="exampleModalLabel"
                                            >
                                              Update Todo
                                            </h5>
                                            <button
                                              type="button"
                                              class="btn-close bg-danger text-white btn"
                                              data-bs-dismiss="modal"
                                              aria-label="Close"
                                            >
                                              <i class="fa-solid fa-xmark"></i>
                                            </button>
                                          </div>
                                          <div class="modal-body">
                                            <div class="mb-3">
                                              <label
                                                for="exampleFormControlInput1"
                                                class="form-label"
                                              >
                                                Enter New Title
                                              </label>
                                              <input
                                                type="email"
                                                class="form-control"
                                                id="exampleFormControlInput1"
                                                defaultValue={
                                                  UpdateTodoId.title
                                                }
                                                onChange={(e) => {
                                                  setnewTitle(e.target.value);
                                                }}
                                              />
                                            </div>
                                            <div class="mb-3">
                                              <label
                                                for="exampleFormControlTextarea1"
                                                class="form-label"
                                              >
                                                Enter New Description
                                              </label>
                                              <input
                                                type="text"
                                                style={{ height: "100px" }}
                                                class="form-control"
                                                id="exampleFormControlInput1"
                                                defaultValue={
                                                  UpdateTodoId.description
                                                }
                                                // defaultValue={t.description}
                                                onChange={(e) => {
                                                  setnewDescription(
                                                    e.target.value
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>
                                          <div class="modal-footer">
                                            <button
                                              type="button"
                                              class="btn btn-secondary"
                                              data-bs-dismiss="modal"
                                            >
                                              Close
                                            </button>
                                            <button
                                              type="button"
                                              data-bs-dismiss="modal"
                                              class="btn btn-primary d-flex "
                                              style={{ height: "40px" }}
                                              onClick={() => {
                                                handleUpdate(UpdateTodoId);
                                              }}
                                            >
                                              Update
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </p>
                                  <p
                                    className=" m-1 p5"
                                    onClick={() => {
                                      deleteDocument(t);
                                    }}
                                  >
                                    {isLoading4 ? (
                                      t.id == LoaderChecker5 ? (
                                        <div>
                                          <div
                                            class="spinner-border text-danger spinner-border-sm"
                                            role="status"
                                          >
                                            <span class="sr-only">
                                              Loading...
                                            </span>
                                          </div>
                                        </div>
                                      ) : (
                                        <i class="fas fa-trash-alt text-danger"></i>
                                      )
                                    ) : (
                                      <i class="fas fa-trash-alt text-danger"></i>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h3>You Don't Have Any Todo</h3>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="text-center b4div">
            <Link to="/frontend/add">
              <button
                type="button"
                className="border btn border-white"
                style={{ width: "80%" }}
              >
                <i className="fas fa-plus-square"></i> Add Todo
              </button>
            </Link>
          </div>
          <hr className="hr1" />
        </div>
        <div className="right shadow pt-4">
          <div className="pb-5">
            <i class="fas fa-calendar-alt i2 text-warning"></i>{" "}
            <span className="s1">DATES</span>
          </div>
          <div>
            <div className="container" style={{ height: "450px" }}>
              <div className="row">
                <div className="col">
                  <Calendar onChange={onChange} value={value} />
                  <br />
                  <HeatMap
                    value={values}
                    style={{ width: "230px" }}
                    startDate={new Date("2016/01/01")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
