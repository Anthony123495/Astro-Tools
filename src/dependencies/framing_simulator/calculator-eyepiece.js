var aladin, container_w, container_h, fov, size, overlay_circle_r_px, overlay_circle_h_px, overlay_x, overlay_y,
    opt_focal_effective, tfov, tfov, tfov, frame_rotation, frame_color_line, frame_circle_color,
    frame_line_color, frame_line_opacity, aux_camera_model = "", debug = !1,
    targets = ["M 1", "M 17", "M 27", "M 51", "M 65", "M 78", "M 83", "M 104", "NGC 104", "NGC 253", "NGC 1399", "NGC 2070", "NGC 4755"],
    target_select = targets[Math.floor(Math.random() * targets.length)];

function calculateValues() {
    if (validate("table_input")) {
        var opt_aperture = $("#opt_aperture").val(), opt_focal = $("#opt_focal").val(),
            opt_reductor = $("#opt_reductor").val(), cam_resolution_x = $("#cam_resolution_x").val(),
            ep_fl = $("#ep_fl").val(),
        	ep_afov = $("#ep_afov").val();
        	

            
            
        fov = aladin.getFov(), size = aladin.getSize(), opt_focal_effective = opt_focal * opt_reductor, 
        $("#res_eff_focal").text(Math.round(opt_focal_effective) + " mm");
        var res_focalratio = Math.round(opt_focal_effective / opt_aperture).toFixed(1);
        $("#res_focalratio").text("F / " + res_focalratio), 
        magnification = Math.round(opt_focal_effective / ep_fl);
         $("#magnification").text(magnification + "x"),
         tfov = Math.round(ep_afov / magnification * 100)/100;
         $("#tfov").text(tfov + "°"),
         exit_pupil = Math.round(opt_aperture / magnification * 10)/10;
         $("#exit_pupil").text(exit_pupil + "mm");
         
      
        $("#res_fov_d").text(tfov.toFixed(2) + "º x " + tfov.toFixed(2) + "º"), 
        $("#tfov").text(tfov.toFixed(2) + "º"), 
        $("#frame_1_circle_text").text("⌀ " + tfov.toFixed(2) + "º");
        
        

        var rayleigh_resolution = 138 / opt_aperture;
        $("#rayleigh_resolution").text(rayleigh_resolution.toFixed(3) + '"');
        var dawes_resolution = 116 / opt_aperture;
        $("#dawes_resolution").text(dawes_resolution.toFixed(3) + '"'), 
        overlay_circle_r_px = Math.round(tfov/2 * size[0] / fov[0]), 
        overlay_circle_h_px = Math.round(tfov/2 * size[1] / fov[1]), 
        overlay_x = Math.round(container_w / 2 - tfov / 2), 
        overlay_y = Math.round(container_h / 2 - tfov / 2), 
 //       debug && console.log(fov, size, overlay_circle_r_px, overlay_circle_h_px, overlay_x, overlay_y), 
//        frame_rotation = $("#frame_rotation").val(), 
        frame_color_line = $("#frame_color_line").val(),
         frame_circle_color = $("#frame_circle_color").val(), 
         frame_line_color = $("#frame_line_color").val(), 
         frame_line_opacity = $("#frame_line_opacity").val(), 
//         $("#frame_rotation_txt").val($("#frame_rotation").val() + "º"), 
         $("#frame_line_opacity_txt").val($("#frame_line_opacity").val())
    }
}
//Cette fonction sert à resize lorsque le champ de vision change
//remove switch
function refreshCameraFrame() {
    if (!$("#overlays").length) return !1;
    switch (calculateValues(), $("#overlay_circle").attr("r", overlay_circle_r_px), 
    $("#overlay_circle").attr("x", overlay_x), 
    $("#overlay_circle").attr("y", overlay_y), 
//    $("#overlay_main").css("transform", "rotate(" + frame_rotation + "deg)"), 
    $("#overlay_circle").css("stroke", frame_color_line), 
    $("#overlay_text_spec").attr("x", overlay_x - tfov/2 - 90), 
    $("#overlay_text_spec").attr("y", overlay_y + overlay_circle_h_px + 20), 
    $("#overlay_text_spec").text(tfov.toFixed(2) + "º (F = " + Math.round(opt_focal_effective) + " mm)"), 
    $("#overlay_text_spec").attr("fill", frame_color_line), 
    $("#overlay_text_equip").attr("fill", frame_color_line), 
    $("#overlay_text_equip").attr("x", overlay_x), 
    $("#overlay_text_equip").attr("y", overlay_y - 10), "" != aux_camera_model ? ($("#overlay_text_equip").css("opacity", 1), 
    $("#overlay_text_equip").text(aux_camera_model)) : $("#overlay_text_equip").css("opacity", 0),    
    $("input[name=frame_line]:checked").val()) {
    }
}

function insertOverlays() {
    if ($("#overlays").length) return !1;
    if (calculateValues(), $("#btn_adjust_fov").attr("disabled", !1), (tfov > fov[0] || tfov > fov[1]) && adjust_fov(), $("#frame_circle_1").is(":checked")) var frame_1_circle_opacity = 1; else var frame_1_circle_opacity = 0;
    if ($("#frame_disk").is(":checked")) var frame_1_disk_opacity = 1; else var frame_1_disk_opacity = 0;
    if ("" != aux_camera_model) var overlay_text_spec_opacity = 1; else var overlay_text_spec_opacity = 0;
    switch ($("input[name=frame_line]:checked").val()) {
        case"frame_line_off":
            frame_line_opacity_third = 0, frame_line_opacity_diagonales = 0, frame_line_opacity_phi = 0;
            break;
    }
    var camera_frame_html = "";
    
//Ici ona le overlay
camera_frame_html += '<div id="overlays" style="position: absolute; pointer-events: none;">', 
camera_frame_html += '  <svg id="camera_frame_1" fill="transparent" xmlns="http://www.w3.org/2000/svg" width="' + container_w + '" height="' + container_h + '">', 
camera_frame_html += '<g id="overlay_main" style="transform: rotate(' + frame_rotation + 'deg); transform-origin: center;">', 
camera_frame_html += '      <circle id="overlay_circle" style="stroke-width: 1; stroke: ' + frame_circle_color + ';" cx="' + Math.round(container_w / 2) + '" cy="' + Math.round(container_h / 2) + '" r="' + Math.round(Math.sqrt(overlay_circle_r_px ** 2 + overlay_circle_h_px ** 2) / 2) + '"></circle>', 
camera_frame_html += '      <text id="overlay_text_spec" x="' + (overlay_x - tfov/2 - 90) + '" y="' + (overlay_y + overlay_circle_h_px + 20) + '" fill="' + frame_color_line + '" style="font-weight: bold; font-size: 1rem;">' + tfov.toFixed(2) + "º" + "(F = " + Math.round(opt_focal_effective) + " mm)</text>", 
//camera_frame_html += '      <text id="overlay_text_equip" x="' + overlay_x + '" y="' + (  10) + '" fill="' + frame_color_line + '" style="font-weight: bold; font-size: 1rem; opacity: ' + overlay_text_spec_opacity + '">' + aux_camera_model + "</text>", 
camera_frame_html += "    </g>", 

camera_frame_html += "  </svg>", 
camera_frame_html += "</div>", $(camera_frame_html).insertBefore(".aladin-reticle")
}

function adjust_fov() {
    null != tfov && aladin.setFov(tfov + 40 * tfov / 100)
}

function validate(container) {
    return validacion = !0, $("#" + container + " > input[type=number], #" + container + " > input[type=text]").each((function () {
        var input_id = $(this).attr("id"), validity = document.getElementById(input_id).checkValidity();
        debug && console.info(input_id + ": " + validity), $("#" + input_id).removeClass("is-invalid"), validity || ($("#" + input_id).addClass("is-invalid"), validacion = !1)
    })), validacion
}

$("#aladin_search").val(target_select), A.init.then(() => {
    if (aladin = A.aladin("#aladin-lite-div", {
        survey: $("#aladin_survey").val(),
        fov: 3,
        target: target_select,
        showZoomControl: !0,
        showFullscreenControl: !1,
        showProjectionControl: !1,
        showLayersControl: !1,
    }), 0 == $("#aladin-lite-div").data("mobile")) {
        const observer = new MutationObserver(() => {
            refreshCameraFrame(), debug && console.log("Change of FOV - desktop")
        });
        observer.observe($(".aladin-fov")[0], {childList: !0, subtree: !0})
    } else {
        var fov_aux = 0;
        const mobile_fov_update = setInterval((function () {
            fov_aux != fov && (fov_aux = fov, refreshCameraFrame(), debug && console.log("Change of FOV - mobile"))
        }), 500)
    }
    $("#frame_reticle").on("change", (function () {
        $("#frame_reticle").is(":checked") ? aladin.reticle._show(!0) : aladin.reticle._show(!1)
    }))
}), $(document).ready((function () {
    $("#btn_adjust_fov").attr("disabled", !0), container_w = $("#aladin-lite-div").width(), container_h = $("#aladin-lite-div").height(), $(window).on("resize", $.debounce(500, (function () {
        0 == $("#aladin-lite-div").data("mobile") ? (container_w = $("#aladin-lite-div").width(), container_h = $("#aladin-lite-div").height()) : (container_h = container_w = $("#aladin-lite-div").width(), $("#aladin-lite-div").height(container_h)), $("#camera_frame_1").attr("width", container_w), $("#camera_frame_1").attr("height", container_h), refreshCameraFrame()
    }))), $("#btn_calculate").on("click", (function () {
        $("#overlays").length ? refreshCameraFrame() : insertOverlays();
        adjust_fov();
    })), $("#opt_aperture, #opt_focal").on("input", (function () {
        $("#overlays").length && refreshCameraFrame()
    })), $("#cam_resolution_x, #cam_resolution_y, #cam_pixel_x, #cam_pixel_y").on("input", (function () {
        aux_camera_model = "", $("#overlays").length && refreshCameraFrame()
    })), $("#opt_reductor, #cam_binning").on("change", (function () {
        $("#overlays").length && refreshCameraFrame()
    })), $("#frame_rotation, #frame_color_line, #frame_circle_color, #frame_line_color, #frame_line_opacity").on("input", (function () {
        $("#frame_rotation_txt").val($("#frame_rotation").val() + "º"), $("#frame_line_opacity_txt").val($("#frame_line_opacity").val()), $("#overlays").length && refreshCameraFrame()
    })), $("#frame_circle_1").on("change", (function () {
        $("#overlays").length && refreshCameraFrame()
    })), $("#frame_disk").on("change", (function () {
        $("#overlays").length && refreshCameraFrame()
    })), $("input[name=frame_line]").on("change", (function () {
        $("#overlays").length && refreshCameraFrame()
    })), $("#frame_rotation_reset").on("click", (function () {
        $("#frame_rotation").val(0), refreshCameraFrame()
    })), $("#aladin_survey").on("change", (function () {
        aladin.setImageSurvey($("#aladin_survey").val())
    })), $("#aladin_search").on("keypress", (function (e) {
        if (13 === e.which) {
            var search_val = $("#aladin_search").val();
            "" != search_val && aladin.gotoObject(search_val)
        }
    })), $("#btn_adjust_fov").on("click", (function () {
        adjust_fov()
    })), $("input[type='text'], input[type='number'], input[type='search']").on("focus", (function () {
        $(this).select()
    }))
}));