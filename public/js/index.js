$('#scrape-button').on('click', event => {
    event.preventDefault()
    $.get('/api/scrape').then(data => {
        console.log('Scraping...')
        location.reload()
    })
})

$('.note-button').on('click', event => {
    event.preventDefault()
    let target = $(event.currentTarget)
    let id = target.data('id')
    let newMessage = target.parent().find('textarea').val()

    target.parent().find('textarea').val('')
    $.post(`/api/note/${id}`, { message: newMessage }).then(data => {
        location.reload()
    })
})

$('.delete-button').on('click', event => {
    event.preventDefault()
    let target = $(event.currentTarget)
    let id = target.data('id')

    $.post(`/api/remove/${id}`).then(data => {
        location.reload()
    })
})

$('.save-button').on('click', event => {
    event.preventDefault()
    let target = $(event.currentTarget)
    let id = target.data('id')

    $.post(`/api/save/${id}`).then(data => {
        location.reload()
    })
})

$('.unsave-button').on('click', event => {
    event.preventDefault()
    let target = $(event.currentTarget)
    let id = target.data('id')

    $.post(`/api/unsave/${id}`).then(data => {
        location.reload()
    })
})
