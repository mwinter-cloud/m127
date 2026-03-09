export const getCookie = (name) => {
    const cookieValue = document.cookie
        .split(";")
        .map((v) => v.trim())
        .find((cookie) => cookie.startsWith(`${name}=`))
    if (!cookieValue) {
        return null
    }
    return decodeURIComponent(cookieValue.split("=")[1])
}

export const getCsrfToken = () => getCookie("csrftoken")
