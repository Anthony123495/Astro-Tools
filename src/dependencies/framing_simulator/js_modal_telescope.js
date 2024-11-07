//Modal Telescope

function searchTelescope(event) {
    const obj = event.currentTarget;

    // Trim the values to remove any leading/trailing whitespace
    const opt_aperture = obj.dataset.opt_aperture.trim();
    const opt_focal = obj.dataset.opt_focal.trim();

    // Ensure the values are valid before assigning them to the inputs
    document.getElementById("opt_aperture").value = opt_aperture;
    document.getElementById("opt_focal").value = opt_focal;

    $('#modal_telescopes').hide().data('bs.modal', null); // Close the modal

    document.getElementById("camera_frames") ? refreshCameraFrame() : insertCameraFrame();
}

// Additional listener to forcefully remove the modal data after hiding to reset any issues
$('#modal_telescopes').on('hidden.bs.modal', function () {
    // Remove Bootstrap's modal data to ensure it doesn't get stuck
    $(this).removeData('bs.modal');
});

const tableBodyTelescope = document.getElementById("table-body-telescope");
getData();


async function getData() {


    const response = await fetch('../data_telescopes.csv');
    const data = await response.text();

    const table = data.split('\n');
    table.forEach((row, index) => {
        const columns = row.split(';')
        const manufacturer = columns[0]
        const model = columns[1]
        const opt_aperture = columns[2]
        const opt_focal = columns[3]
        const tr = document.createElement("tr");

        tr.dataset.manufacturer = manufacturer;
        tr.dataset.model = model;
        tr.dataset.opt_aperture = opt_aperture;
        tr.dataset.opt_focal = opt_focal;

        tr.style.cursor = "pointer";
        tr.addEventListener("click", searchTelescope);

        tr.innerHTML = `
					          <td class="">${manufacturer}</td>
					          <td class="">${model}</td>
					          <td class="">${opt_aperture} mm</td>
					          <td class="">${opt_focal} mm</td>
							`;
        // finally add the <tr> to the <tbody>
        tableBodyTelescope.append(tr);
    })

}

//Modal Telescope Filter



$(document).ready((function () {
    $("#modal_telescopes").on("shown.bs.modal", (function (event) {
        $("#filter_telescopes").focus()
    })), $("#filter_telescopes").on("input", (function () {
        var filter = $(this).val().toLowerCase();
        $("#modal_telescope_table tbody tr").each((function () {
            var filter_telescope;
            ($(this).data("manufacturer").toString().toLowerCase() + " " + $(this).data("model").toString().toLowerCase()).includes(filter) ? $(this).show() : $(this).hide()
        }))
    }))
}));