let allEmployees = []


function listadoEmpleados(allEmployees) {
    allEmployees.forEach((empleado) => {
        let users = `<tr class="fila_${empleado.id}">
                        <th scope="row">
                            <img id="imagenEmpleado" src="https://js-tutorials.com/demos/angular_smarttable_add_edit_demo/user.jpg" alt="">
                        </th>
                        <td>${empleado.employee_name}</td>
                        <td>${empleado.employee_salary}</td>
                        <td>${empleado.employee_age}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                                <button data-id="${empleado.id}" type="button" class="btn btn-primary botonSearch0" data-toggle="modal" data-target="#exampleModal">
                                    <i class="fas fa-search"></i>
                                </button>
                                <button data-id="${empleado.id}" type="button" class="btn btn-primary botonEdit0" data-toggle="modal" data-target="#exampleModal1">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button type="button" class="btn btn-secondary botonDelete0" data-id="${empleado.id}">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`
        $('body > div:nth-child(2) > div > div > table > tbody').append(users)
    });
    eventosBotones()

}

$(window).on('load', () => {
    cargarDatos()
})


function eventosBotones() {
    $('.botonDelete0').on('click', function () {
        if (confirm("¿Desea eliminar empleado?")) {
            var dataId = $(this).attr("data-id");
            alert($(this).attr("data-id"));
            borrarDatos(dataId);
            console.log(dataId)

        }
    });

    $('.botonSearch0').on('click', function () {
        var dataId = $(this).attr("data-id");
        console.log(dataId)
        for (let i = 0; i < allEmployees.length; i++) {
            if (allEmployees[i].id === dataId) {

                let datosEmpleado = `
                        <div class="row">
                            <div class="col-2">
                                <p>Name</p>
                            </div>
                            <div class="col-10">
                                <p>${allEmployees[i].employee_name}</p>
                            </div>
                            <div class="col-2">
                                <p>Age</p>
                            </div>
                            <div class="col-10">
                                <p>${allEmployees[i].employee_age}</p>
                            </div>
                            <div class="col-2">
                                <p>Salary</p>
                            </div>
                            <div class="col-10">
                                <p>${allEmployees[i].employee_salary}</p>
                            </div>
                         </div>`
                $('.infoEmpleados').html(datosEmpleado)
            }
        }
    });

    //PARA EDITAR EMPLEADO
    $('.botonEdit0').on('click', function () {
        var dataId = $(this).attr("data-id");

        for (let i = 0; i < allEmployees.length; i++) {
            if (allEmployees[i].id === dataId) {

                let datosCambioEmpleado = `
                    <div class="row">
                        <div class="col-2">
                            <p>Name</p>
                        </div>
                        <div class="col-10">
                            <input name="employee_name" type="text" value="${allEmployees[i].employee_name}">
                            <input name="id" type="hidden" value="${allEmployees[i].employee_id}">
                            </div>
                        <div class="col-2">
                            <p>Age</p>
                        </div>
                        <div class="col-10">
                            <input name="employee_age" type="text" value="${allEmployees[i].employee_age}">
                        </div>
                        <div class="col-2">
                            <p>Salary</p>
                        </div>
                        <div class="col-10">
                            <input name="employee_salary" type="text" value="${allEmployees[i].employee_salary}">
                        </div>
                        </div>`
                $('.editaEmpleado').html(datosCambioEmpleado)
                $('.actualizarInfo').on('click', function () {
                    console.log(dataId)
                    let name = $('.editaEmpleado input[name="employee_name"]').val();
                    console.log(name)
                    let age = $('.editaEmpleado input[name="employee_age"]').val();
                    console.log(age)
                    let salary = $('.editaEmpleado input[name="employee_salary"]').val();
                    console.log(salary)
                    let objActualizado = { id: dataId, name: name, salary: salary, age: age };
                    console.log(objActualizado)
                    editarEmpleado(objActualizado)

                })



            }
        }


    });

    $('#botonCrear').on('click', function () {
        let datosNuevoEmpleado = `
                    <div class="row">
                        <div class="col-2">
                            <p>Name</p>
                        </div>
                        <div class="col-10">
                            <input id="nombreE" type="text" >
                        </div>
                        <div class="col-2">
                            <p>Age</p>
                        </div>
                        <div class="col-10">
                            <input id="edadE" type="text">
                        </div>
                        <div class="col-2">
                            <p>Salary</p>
                        </div>
                        <div class="col-10">
                            <input id="salarioE" type="text" >
                        </div>
                    </div>`
        $('#añadeEmpleado').html(datosNuevoEmpleado)
        $('.guardarEmpleado').on('click', function () {
            let nameNuevoEmpleado = $("#nombreE").val();
            console.log(nameNuevoEmpleado)
            let ageNuevoEmpleado = $("#edadE").val();
            console.log(ageNuevoEmpleado)
            let salaryNuevoEmpleado = $("#salarioE").val();
            console.log(salaryNuevoEmpleado)
            let objNuevoEmpleado = {"name":nameNuevoEmpleado, "salary":salaryNuevoEmpleado, "age":ageNuevoEmpleado};
            console.log(objNuevoEmpleado)
            crearNuevoEmpleado(objNuevoEmpleado)
        })





    })

}


// PARA CARGAR LOS DATOS DE TODOS LOS USUARIOS
function cargarDatos() {
    
    $.get("https://cors-anywhere.herokuapp.com/http://prana-solutions.com/neoland/ecommerce/?getEmployees=1", function (data) {
        for (let i = 0; i < data.length; i++) {
            allEmployees.push(data[i])
        }
        listadoEmpleados(allEmployees)
    }, "json");
    console.log(allEmployees)
}


// HTTP PARA BORRAR UN USUARIO

function borrarDatos(id) {
    $.ajax({
        "type": "DELETE",
        "url": "http://dummy.restapiexample.com/api/v1/delete/" + id,
        "dataType": "json",
        "headers": { "Content-Type": "application/json" },
        "success": (data) => { $(`.fila_${id}`).remove() },
        "error": (error) => { console.log(error) }
    })
}

// HTTP PARA EDITAR UN USUARIO

function editarEmpleado(objActualizado) {
    console.log(objActualizado)
    $.ajax({
        "type": "PUT",
        "url": "http://dummy.restapiexample.com/api/v1/update/" + objActualizado.id,
        "dataType": "json",
        "data": JSON.stringify(objActualizado),
        "headers": {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        "success": (data) => { console.log(data) },
        "error": (error) => { console.log(error) }
    })

}

// HTTP PARA CREAR UN USUARIO
function crearNuevoEmpleado(objNuevoEmpleado) {
    $.ajax({
        "type": "POST",
        "url": "http://dummy.restapiexample.com/api/v1/create",
        "dataType": "json",
        "data": JSON.stringify(objNuevoEmpleado ),
        "headers": {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        "success": (data) => { console.log(data) },
        "error": (error) => { console.log(error) }
    })

}
