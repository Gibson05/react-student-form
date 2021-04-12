import { updateUserName } from "./app/userSlice"
import { store } from "./app/store"
const API = "https://gibson-students-api.herokuapp.com/users/"
const PAGE_LIMIT = 8

export async function getUser(page = 1, sort, order) {
    let sortProp = sort ? `&_sort=${sort}` : ""
    let sortOrder = order ? `&_order=${order}` : ""

    let URL = `${API}?_page=${page}&_limit=${PAGE_LIMIT}${sortProp}${sortOrder}`;
    const res = await fetch(URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
    const data = await res.json();
    const totalCount = res.headers.get("X-Total-Count");
    return { data, totalCount }
}

export async function checkLogin(mail, pass) {
    const res = await fetch("https://gibson-students-api.herokuapp.com/login", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: mail,
            password: pass,
        })
    })
    const data = await res.json();
    const token = await data.token;
    localStorage.setItem('token', token)
    await store.dispatch(updateUserName(data))
    console.log(data);

    return res
}