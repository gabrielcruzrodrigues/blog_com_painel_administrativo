function confirmDelete(event, form) {
    event.preventDefault();
    let confirmation = confirm('Você tem certeza que deseja Deletar esta categoria?');   
    if (confirmation) {
        form.submit();
    }
};