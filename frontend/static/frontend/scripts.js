$('body').on('click', '.spoiler button', (e) => {
    e.preventDefault()
    let main = e.target.closest(".spoiler").querySelector('main')
    if(main.classList.contains('open-block')) {
        main.classList.remove('open-block')
    } else {
        main.classList.add('open-block')
    }
})
$('body').on('click', '.answer-link', (e) => {
    e.preventDefault()
    const answer_id = e.target.getAttribute('data-id')
    const answer_block = document.getElementById('answer' + answer_id)
    if (answer_block !== null) {
        const y = answer_block.offsetTop - 20
        window.scrollTo(0, y)
    }
})