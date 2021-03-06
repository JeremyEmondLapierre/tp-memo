import './Controle.scss';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { compteur } from '../services/crud-taches'

export default function Controle({etatTaches, utilisateur, supprimerCompletee,  mettreTout, mettreCompletee, mettreActives}) {
  
  return (
    <footer className="Controle">
      {/* <ToggleButtonGroup 
        size="small" 
        exclusive={true} 
      >
        <ToggleButton value={'toutes'} onClick={lireTout}>Toutes</ToggleButton>
        <ToggleButton value={true}>Complétées</ToggleButton>
        <ToggleButton value={false}>Actives</ToggleButton>
      </ToggleButtonGroup> */}
      <button onClick={mettreTout}>Toutes</button>
      <button onClick={mettreCompletee}>Complétées</button>
      <button onClick={mettreActives}>Actives</button>
      <span className="compte">
        {compteur} tâches restantes
      </span>
      <IconButton 
        aria-label="delete" 
        size="small" 
        variant="contained" 
        color="secondary" 
        onClick={() => supprimerCompletee()} 
        title="Supprimer les tâches complétées"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </footer>
  );
}