//Modal Telescope

function searchEyepiece(event) {
    const obj = event.currentTarget;

    // Trim the values to remove any leading/trailing whitespace
    const ep_fl = obj.dataset.ep_fl.trim();
    const ep_afov = obj.dataset.ep_afov.trim();

    // Ensure the values are valid before assigning them to the inputs
    document.getElementById("ep_fl").value = ep_fl;
    document.getElementById("ep_afov").value = ep_afov;

    $('#modal_eyepiece').hide().data('bs.modal', null); // Close the modal

    document.getElementById("overlays") ? refreshCameraFrame() : insertOverlays();
}

// Additional listener to forcefully remove the modal data after hiding to reset any issues
$('#modal_eyepiece').on('hidden.bs.modal', function () {
    // Remove Bootstrap's modal data to ensure it doesn't get stuck
    $(this).removeData('bs.modal');
});

const tableBodyEyepiece = document.getElementById("table-body-eyepiece");
getData();


async function getData() {


    const response = await fetch('../data_eyepieces.csv');
    const data = await response.text();

    const table = data.split('\n');
    table.forEach((row, index) => {
        const columns = row.split(';')
        const manufacturer = columns[0]
        const model = columns[1]
        const ep_fl = columns[2]
        const ep_afov = columns[3]
        const tr = document.createElement("tr");

        tr.dataset.manufacturer = manufacturer;
        tr.dataset.model = model;
        tr.dataset.ep_fl = ep_fl;
        tr.dataset.ep_afov = ep_afov;

        tr.style.cursor = "pointer";
        tr.addEventListener("click", searchEyepiece);

        tr.innerHTML = `
					          <td class="">${manufacturer}</td>
					          <td class="">${model}</td>
					          <td class="">${ep_fl} mm</td>
					          <td class="">${ep_afov} mm</td>
							`;
        // finally add the <tr> to the <tbody>
        tableBodyEyepiece.append(tr);
    })

}

//Modal Telescope Filter



$(document).ready((function () {
    $("#modal_eyepiece").on("shown.bs.modal", (function (event) {
        $("#filter_camera").focus()
    })), $("#filter_camera").on("input", (function () {
        var filter = $(this).val().toLowerCase();
        $("#modal_eyepiece_table tbody tr").each((function () {
            var filter_telescope;
            ($(this).data("manufacturer").toString().toLowerCase() + " " + $(this).data("model").toString().toLowerCase()).includes(filter) ? $(this).show() : $(this).hide()
        }))
    }))
}));
