import { useEffect } from "react";

const Aladin = ({Survey}) => {

    var aladin, container_w, container_h, fov, size, frame_w_px, frame_h_px, frame_x, frame_y,
    opt_focal_effective, res_fov_d_x, res_fov_d_y, res_fov_diag, frame_rotation, frame_color_line, frame_circle_color,
    frame_line_color, frame_line_opacity, aux_camera_model = "";
    targets = ["M 1", "M 17", "M 27", "M 51", "M 65", "M 78", "M 83", "M 104", "NGC 104", "NGC 253", "NGC 1399", "NGC 2070", "NGC 4755"],
    target_select = targets[Math.floor(Math.random() * targets.length)];

    useEffect(() => {
        let aladin = A.aladin('#aladin-lite-div', {survey: Survey, fov:60, showFullscreenControl: false, showLayersControl: false})
        aladin.setFov(1)
    }, [])

    return (
        <div id="aladin-container">
            <div id='aladin-lite-div' style={{width: '100%', height: '1000px'}} />
        </div>
    )
}

export default Aladin