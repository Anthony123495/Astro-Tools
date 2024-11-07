import ForeCast from "pages/apps/e-commerce/foreCast";
import ImagingFramingSimulator from "pages/apps/e-commerce/ImagingFramingSimulator";
import VisualFramingSimulator from "pages/apps/e-commerce/VisualFramingSimulator";

const ToolsList = [
    {
        id: 'astrophotography-framing-assistant', //Slug
        image: 'https://tools.davidastro.com/assets/img/astro/LDN1448.png',
        title: 'Astrophotography Framing Assistant',
        brand: 'David Astro',   
        category: 'Imaging',
        contentType: 'Simulator',
        content1: 'The David Astro Tools Astrophotography Framing Assistant is a powerful tool designed to help you precisely frame your celestial targets.',
        content2: 'By selecting your equipment from our extensive database (camera, telescope, focal reducer) or manually entering key details (focal length, pixel size, sensor size), you can visualize your composition in real-time with the help of the dynamic Aladin API navigator.',
        content3: 'Additionally, the tool provides a comprehensive table of calculated values, including: ',
        content4: 'Focal Ratio, Effective Focal Length, Field of View (FOV), Resolution, Dawes Resolution, Rayleigh Resolution.',
        content5: 'These values can be found at the bottom of this page, in the table.',
        component: ImagingFramingSimulator
    },
    {
        id: 'visual-astronomy-assistant', //Slug
        image: '',
        title: 'Visual Astronomy Assistant',
        brand: 'David Astro',
        category: 'Visual',
        contentType: 'Simulator',
        content1: '',
        content2: '',
        content3: '',
        content4: '',
        component: VisualFramingSimulator
    },
    {
        id: 'forecast', //Slug
        image: '',
        title: 'ForeCast',
        brand: 'David Astro',
        category: 'ForeCast',
        contentType: 'Simulator',
        content1: '',
        content2: '',
        content3: '',
        content4: '',
        component: ForeCast
    }
  ];
  
  export default ToolsList;
  