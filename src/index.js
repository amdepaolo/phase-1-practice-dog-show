document.addEventListener('DOMContentLoaded', () => {
    fetchAndBuild();
    submitHandler();

})
let currentId;
function buildTable(obj){
    const tr = document.createElement('tr')
    tr.id = obj.id;
    tr.innerHTML =`
    <td>${obj.name}</td>
    <td>${obj.breed}</td>
    <td>${obj.sex}</td>
    <td><button>Edit</button></td>`
    tr.querySelector('button').addEventListener('click', e=>{
        editFetch(e.target.parentNode.parentNode.id)
    })
    document.getElementById('table-body').append(tr)
}

function fetchAndBuild(){
    document.getElementById('table-body').innerText=''
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(resp => resp.forEach(buildTable))
    .catch(console.error())
}

function editForm(obj){
    const dogForm = document.getElementById('dog-form')
    dogForm.name.value = obj.name
    dogForm.breed.value = obj.breed
    dogForm.sex.value = obj.sex
    currentId = obj.id
}

function editFetch(id){
    fetch(`http://localhost:3000/dogs/${id}`)
    .then(resp => resp.json())
    .then(editForm)
    .catch(console.error())
}

function submitHandler(){
    let dogForm = document.getElementById('dog-form')
    dogForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        let patchedObj = {
            name: dogForm.name.value,
            breed: dogForm.breed.value,
            sex: dogForm.sex.value
        }
        console.log(patchedObj)
        fetch(`http://localhost:3000/dogs/${currentId}`,{
            method: 'PATCH',
            headers:{"content-type": "application/json"},
            body: JSON.stringify(patchedObj)
        })
        .then(fetchAndBuild)
        .then(dogForm.reset())
        .catch(err => console.log(err))
    })
}