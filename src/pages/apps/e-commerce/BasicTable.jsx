import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

// material-ui
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// third-party
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';

// project import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';

import Papa from 'papaparse';
import { values } from 'lodash';



// ==============================|| REACT TABLE ||============================== //

function ReactTable({ striped }) {

  Papa.parse(`Askar;103APO;103;700;
  Askar;107PHQ;107;749;
  Askar;120APO;120;840;
  Askar;130PHQ;130;1000;
  Askar;140APO;140;980;
  Askar;151PHQ;151;1057;
  Askar;185APO;185;1295;
  Askar;203APO;203;1421;
  Askar;65PHQ;65;416;
  Askar;71F;71;490;
  Askar;80PHQ;80;600;
  Askar;ACL200;50;200;
  Askar;Askar V 60mm;60;360;
  Askar;Askar V 80mm;80;500;
  Askar;FMA135;35;135;
  Askar;FMA180;40;180;
  Askar;FMA230;50;230;
  Askar;FRA300;60;300;
  Askar;FRA400;72;400;
  Askar;FRA500;90;500;
  Askar;FRA600;108;600;
  Askar;SQA55;55;264;
  Celestron;114LCM;114;1000;
  Celestron;700 Maksutov-Cassegrain ;180;2700;
  Celestron;80LCM;80;900;
  Celestron;Advanced VX 6" Newtonian;150;750;
  Celestron;Advanced VX 6" Refractor;150;1200;
  Celestron;Advanced VX 8" Newtonian;200;1000;
  Celestron;Astro Fi 102mm;102;1325;
  Celestron;Astro Fi 130mm;130;650;
  Celestron;Astro Fi 90mm;90;910;
  Celestron;AstroMaster 102AZ;102;660;
  Celestron;AstroMaster 114EQ;114;1000;
  Celestron;AstroMaster 130EQ;130;650;
  Celestron;AstroMaster 70AZ;70;900;
  Celestron;AstroMaster 90AZ;90;1000;
  Celestron;AstroMaster 90EQ;90;1000;
  Celestron;AstroMaster LT 60AZ;60;700;
  Celestron;AstroMaster LT 70AZ;70;700;
  Celestron;C11 XLT;279.4;2800;
  Celestron;C14 XLT;355.5;3910;
  Celestron;C6 XLT;150;1500;
  Celestron;C8 XLT;203.2;2032;
  Celestron;C9.25 XLT;235;2350;
  Celestron;CPC 1100 GPS;279.4;2800;
  Celestron;CPC 800 GPS;203.2;2032;
  Celestron;CPC 925 GPS;235;2350;
  Celestron;CPC Deluxe 1100 HD;279.4;2800;
  Celestron;CPC Deluxe 800 HD;203.2;2032;
  Celestron;CPC Deluxe 925 HD;235;2350;
  Celestron;EdgeHD 11";279.4;2800;
  Celestron;EdgeHD 14";356;3910;
  Celestron;EdgeHD 8";203.2;2032;
  Celestron;EdgeHD 9.25";235;2350;
  Celestron;Evolution 6;150;1500;
  Celestron;Evolution 8;203.2;2032;
  Celestron;Evolution 8 EdgeHD;203.2;2032;
  Celestron;Evolution 9.25;235;2350;
  Celestron;ExploraScope 114AZ;114;1000;
  Celestron;FirstScope;76;300;
  Celestron;Inspire 100AZ;100;660;
  Celestron;Nexstar 127 SLT;127;1500;
  Celestron;Nexstar 130 SLT;130;650;
  Celestron;Nexstar 4SE;102;1325;
  Celestron;Nexstar 5SE;125;1250;
  Celestron;Nexstar 6SE;150;1500;
  Celestron;Nexstar 8SE;203.2;2032;
  Celestron;Nexstar 90 SLT;90;1250;
  Celestron;Omni XLT 102;102;1000;
  Celestron;Omni XLT 120;120;1000;
  Celestron;Omni XLT 150;150;750;
  Celestron;Origin;152;335;
  Celestron;PowerSeeker 114EQ;114;900;
  Celestron;PowerSeeker 127EQ;127;1000;
  Celestron;PowerSeeker 50AZ;50;600;
  Celestron;PowerSeeker 60AZ;60;700;
  Celestron;PowerSeeker 70EQ;70;700;
  Celestron;PowerSeeker 80AZS;80;400;
  Celestron;PowerSeeker 80EQ;80;900;
  Celestron;RASA 11";279;620;
  Celestron;RASA 36cm;355.6;790;
  Celestron;RASA 8";203;400;
  Celestron;SkyProdigy 130;130;650;
  Celestron;StarSense Explorer 10" Dobsonian";254;1200;
  Celestron;StarSense Explorer 114mm TableTop Dobsonian;114;450;
  Celestron;StarSense Explorer 12" Dobsonian";305;1500;
  Celestron;StarSense Explorer 130mm TableTop Dobsonian;130;650;
  Celestron;StarSense Explorer 150mm TableTop Dobsonian;150;750;
  Celestron;StarSense Explorer 8" Dobsonian";203;1200;
  Celestron;StarSense Explorer DX 102AZ;102;660;
  Celestron;StarSense Explorer DX 130AZ;130;650;
  Celestron;"StarSense Explorer DX 5" SCT";125;1250;
  Celestron;StarSense Explorer LT 114AZ;114;1000;
  Celestron;StarSense Explorer LT 80AZ;80;900;
  Celestron;Travel Scope 50;50;360;
  Celestron;Travel Scope 60;60;360;
  Celestron;Travel Scope 70;70;400;
  Celestron;Travel Scope 80;80;400;
  Daystar;Solar Scout SS60;60;930;
  Daystar;Solar Scout SS60-DS;60;930;
  Daystar;Solar Scout SS80;80;1400;
  Daystar;SolarREDi SR-127;127;2667;
  Explore Scientific;"10" Hybrid Truss Tube Dobsonian";254;1270;
  Explore Scientific;"10" Truss Tube Dobsonian";254;1270;
  Explore Scientific;"12" Truss Tube Dobsonian";350;1525;
  Explore Scientific;"16" Truss Tube Dobsonian";409;1826;
  Explore Scientific;"20" Truss Tube Dobsonian";500;1826;
  Explore Scientific;AR102 Doublet;102;663;
  Explore Scientific;AR127 Doublet;127;826;
  Explore Scientific;AR152 Doublet;152;988;
  Explore Scientific;ED102 Essential Series;102;714;
  Explore Scientific;ED102 FCD100;102;714;
  Explore Scientific;ED102 FCD100 Carbon Fiber;102;714;
  Explore Scientific;ED115 FPL53 Carbon Fiber;115;632;
  Explore Scientific;ED127 Essential Series;127;952;
  Explore Scientific;ED127 FCD100;127;952;
  Explore Scientific;ED127 FCD100 Carbon Fiber;127;952;
  Explore Scientific;ED140 FPL53 Carbon Fiber;140;910;
  Explore Scientific;ED152 Carbon Fiber;152;1216;
  Explore Scientific;ED165 FPL53 Carbon Fiber;165;1155;
  Explore Scientific;ED80 Essential Series;80;480;
  Explore Scientific;ED80 FCD100;80;480;
  Explore Scientific;"FirstLight 10" Dobsonian";254;1270;
  Explore Scientific;FirstLight 100mm Mak-Cassegrain;100;1400;
  Explore Scientific;FirstLight 102mm Doublet;102;1000;
  Explore Scientific;FirstLight 127mm Doublet;127;1200;
  Explore Scientific;FirstLight 127mm Mak-Cassegrain;127;1900;
  Explore Scientific;FirstLight 130mm Newtonian;130;600;
  Explore Scientific;FirstLight 152mm Doublet;152;760;
  Explore Scientific;FirstLight 152mm Mak-Cassegrain;152;1900;
  Explore Scientific;FirstLight 203mm Newtonian;203;1000;
  Explore Scientific;"FirstLight 8" Dobsonian";203;1218;
  Explore Scientific;FirstLight 80mm Refractor;80;640;
  iOptron;150mm Imaging Newtonian;150;600;
  iOptron;200mm Imaging Newtonian;200;800;
  iOptron;250mm Imaging Newtonian;250;1000;
  iOptron;300mm Imaging Newtonian;300;1200;
  iOptron;Photron RC10;254;2032;
  iOptron;Photron RC12;304;2432;
  iOptron;Photron RC14;355;2848;
  iOptron;Photron RC16;406;3250;
  iOptron;Photron RC6;150;1370;
  iOptron;Photron RC8;200;1624;
  Lunt;LS100MT;100;714;
  Lunt;LS130MT;130;910;
  Lunt;LS152THa;152;900;
  Lunt;LS230THa;230;1610;
  Lunt;LS305THa;300;2100;
  Lunt;LS40THa;40;400;
  Lunt;LS50THa;50;350;
  Lunt;LS60MT;60;420;
  Lunt;LS80MT;80;560;
  SharpStar;13028HNT;130;364;
  SharpStar;140PH;140;910;
  SharpStar;15028HNT;150;420;
  SharpStar;50EDPH;50;275;
  SharpStar;61EDPHIII;61;360;
  SharpStar;94EDPH;94;517;
  SharpStar;SCA260V2;260;1300;
  SharpStar;Z4;100;482;
  Sky-Watcher;Classic 150P;152;1200;
  Sky-Watcher;Classic 200P;203;1200;
  Sky-Watcher;Classic 250P;254;1200;
  Sky-Watcher;Esprit 100ED;100;550;
  Sky-Watcher;Esprit 120ED;120;840;
  Sky-Watcher;Esprit 150ED;150;1050;
  Sky-Watcher;Esprit 80ED;80;400;
  Sky-Watcher;EvoGuide 50DX;50;242;
  Sky-Watcher;Evolux 62ED;62;400;
  Sky-Watcher;Evolux 82ED;82;530;
  Sky-Watcher;EvoStar 100ED;100;900;
  Sky-Watcher;EvoStar 120ED;120;900;
  Sky-Watcher;EvoStar 150ED;150;1200;
  Sky-Watcher;EvoStar 50ED;50;355;
  Sky-Watcher;EvoStar 72ED;72;420;
  Sky-Watcher;EvoStar 80ED;80;600;
  Sky-Watcher;Explorer 130P;130;650;
  Sky-Watcher;Explorer 150P;150;750;
  Sky-Watcher;Explorer 200P;200;1000;
  Sky-Watcher;Explorer 250P;250;1200;
  Sky-Watcher;Explorer 300P;300;1500;
  Sky-Watcher;Flextube 200P;203;1200;
  Sky-Watcher;Flextube 250P;254;1200;
  Sky-Watcher;Flextube 300P;305;1500;
  Sky-Watcher;Flextube 350P;356;1650;
  Sky-Watcher;Flextube 400P;406;1800;
  Sky-Watcher;GTi 150P Smart Dobsonian;150;750;
  Sky-Watcher;MN190;190;1000;
  Sky-Watcher;Quattro 200P;200;800;
  Sky-Watcher;Quattro 250P;250;1000;
  Sky-Watcher;Quattro 300P;300;1200;
  Sky-Watcher;SkyMax 102;102;1300;
  Sky-Watcher;SkyMax 127;127;1500;
  Sky-Watcher;SkyMax 150;150;1800;
  Sky-Watcher;SkyMax 180;180;2700;
  Sky-Watcher;SkyMax 90;90;1250;
  Sky-Watcher;StarTravel 102;102;500;
  Sky-Watcher;StarTravel 120;120;600;
  Sky-Watcher;StarTravel 150;150;750;
  Sky-Watcher;StarTravel 80;80;400;
  William Optics;Fluorostar FLT132;132;925;
  William Optics;Fluorostar FLT156;156;1217;
  William Optics;Fluorostar FLT91;91;540;
  William Optics;Gran Turismo GT102;102;703;
  William Optics;Gran Turismo GT71;71;418;
  William Optics;Gran Turismo GT81;81;478;
  William Optics;Gran Turismo GT91;91;545;
  William Optics;GuideStar;61;360;
  William Optics;Megrez 120;120;900;
  William Optics;Megrez 72;72;432;
  William Optics;Megrez 90;90;560;
  William Optics;MiniCat 51;51;178;
  William Optics;Pleiades 68;68;260;
  William Optics;Pleiades 68;111;528;
  William Optics;Pleiades 68;181;998;
  William Optics;RedCat 51;51;250;
  William Optics;RedCat 61;61;300;
  William Optics;RedCat 71;71;350;
  William Optics;SpaceCat 51;51;250;
  William Optics;SpaceCat 61;61;300;
  William Optics;ZenithStar Z61;61;360;
  William Optics;ZenithStar Z71;71;418;
  William Optics;ZenithStar Z73;73;430;
  William Optics;ZenithStar Z81;81;478;
  ZWO;Seestar S50;50;250;
  `, {
    header: false,
    skipEmptyLines: true,
    complete: function (results) {
      const rowsArray = [];
      const valuesArray = [];

      // Iterating data to get column name and their values
      results.data.map((d) => {
        rowsArray.push(Object.keys(d));
        valuesArray.push(Object.values(d));
      });
    },
  });


  return (
    <MainCard
      content={false}
    >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
                <TableRow key='1'>
                    <TableCell key='1'>
                      Brand
                    </TableCell>
                    <TableCell key='2'>
                      Model
                    </TableCell>
                    <TableCell key='3'>
                      Aperture
                    </TableCell>
                    <TableCell key='4'>
                      Focal Length
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody {...(striped && { className: 'striped' })}>
                <TableRow key=''>
                    <TableCell key=''>

                    </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - BASIC ||============================== //

export default function BasicTable({ striped, title }) {
  return <ReactTable />;
}
