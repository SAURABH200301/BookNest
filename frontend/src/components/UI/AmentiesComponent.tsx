import { capitalize } from "lodash";
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';

import { AmenitiesEnum } from "../../types/hotel";
import { Box, Grid } from "@mui/material";

export interface AmentiesProps {
  amenties: AmenitiesEnum[];
}

export default function AmentiesComponent({ amenties }: AmentiesProps) {

  const getAmenityIcon = (amenity: AmenitiesEnum) => {
    switch (amenity) {
      case AmenitiesEnum.POOL:
        return <PoolIcon/>;
      case AmenitiesEnum.GYM:
        return <FitnessCenterIcon/>;
      case AmenitiesEnum.SAUNA:
        return "🔥";
      case AmenitiesEnum.TENNIS_COURT:
        return <SportsTennisIcon/>;
      case AmenitiesEnum.PLAYGROUND:
        return <SportsHandballIcon/>;
      case AmenitiesEnum.BBQ_AREA:
        return <OutdoorGrillIcon/>;
      case AmenitiesEnum.WIFI:
        return <NetworkWifiIcon/>
      default:
        return "❓";
    }
  };

  return (
    <Box sx={{display:'flex', alignContent:'center',alignItems:'center'}}>
      <Grid container rowSpacing={0.5} columnSpacing={1}>
      {amenties.map((amenity) => {
        return (
          <Grid size={4} key={amenity} style={{display:'inline-flex'}}>
            {getAmenityIcon(amenity)}{"  "}
            {capitalize(amenity.replace(/_/g, " ").toLowerCase())}
          </Grid>
        );
      })}
      </Grid>
    </Box>
  );
}
