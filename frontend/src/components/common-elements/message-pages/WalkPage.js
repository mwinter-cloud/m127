import React, {useEffect, useState} from 'react'
import './style/walk-page.css'

function WalkPage(props) {
	window.scrollTo(0, 0)
	const id  = props.code
	const [error_msg, setErrorMsg] = useState({})
	const useMountEffect = () => {
		useEffect(() => {
	        setErrorMsg('')
            if(id=='1') {
                let a = document.createElement('a')
                a.setAttribute('href','/login')
                a.innerHTML = 'Войдите'
                document.getElementById('error_msg').appendChild(a)
                setErrorMsg("Вы не авторизированы.")
            } else if (id=="2") {
                setErrorMsg('Какая-то непонятная ошибка возникла! Что бы это могло быть?')
            } else if (id=="3") {
                setErrorMsg('Ты не пройдешь! ( пока что у тебя нет доступа к этому ресурсу, надо что-то предпринять)')
            } else if (id=="4") {
	            const prevention_to  = props.prevention_to
                setErrorMsg('Ведутся профилактические работы. Это продлится до '+prevention_to)
            }  else if (id=="5") {
                setErrorMsg('Вход воспрещен, потому что профиль заблокирован.')
            }  else {
                setErrorMsg('Страница не найдена')
            }
          }, [])
	}
	useMountEffect()
  	return (
          <main className="error-page">
              <header className="error-msg-header"><i className="el-icon-warning-outline"></i> {id!='4'?'Ошибка :D':''} {String(error_msg)}<div id="error_msg"></div></header>
              <p>Для прогулки хороша любая погода! Почему бы тебе не прогуляться?</p>
              <div className="walk-img"></div>
          </main>
	)
}

export default WalkPage
