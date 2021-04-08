const API = "https://gibson-students-api.herokuapp.com/users/"
const PAGE_LIMIT = 8

export async function getUser(page = 1, sort, order) {
    let sortProp = sort ? `&_sort=${sort}` : ""
    let sortOrder = order ? `&_order=${order}` : ""

    let URL = `${API}?_page=${page}&_limit=${PAGE_LIMIT}${sortProp}${sortOrder}`;
    const res = await fetch(URL);
    const data = await res.json();
    const totalCount = res.headers.get("X-Total-Count");
    return { data, totalCount }
}

export async function checkLogin(mail, pass) {
    return await fetch("https://gibson-students-api.herokuapp.com/login", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: mail,
            password: pass,
        })
    })
}