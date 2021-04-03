import React from 'react'

export default function SignOut () {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    removeCookie('token')
    document.location = '/movies'
    return (
        <></>
    )
}