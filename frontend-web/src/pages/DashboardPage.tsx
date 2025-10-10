import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { ADMIN_CONFIG } from '../config/admin';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const IsAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box 
        sx={{ 
          textAlign: 'center', 
          p: { xs: 4, md: 6 }, 
          bgcolor: 'background.paper', 
          borderRadius: 4, 
          maxWidth: 600,
          background: 'linear-gradient(135deg, rgba(0,131,136,0.1), rgba(25, 205, 148, 0.1))'
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          mb={4}
          tabIndex={0}
        >
          <Box
            component="img"
            src="agroconecta-icon.png"
            alt="Logo"
            sx={{ height: 80 }}
          />
        </Box>
        <Typography variant="h4" fontWeight={600} color='#19CD94' gutterBottom>
          Banco de Soluções do AgroConecta
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Encontre soluções inovadoras para o agronegócio.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 12 }}>
          <Button
            sx={{
              bgcolor: '#19CD94', 
              color: 'white', 
              px: 3, py: 1.2,
              borderRadius: 3,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': { bgcolor: 'rgba(25, 205, 148, 0.6)' }
            }} 
            onClick={() => navigate('/solutions')}
          >
            Ver Soluções
          </Button>

          {ADMIN_CONFIG.ADMIN_MODE || IsAdmin && (
            <Button
              sx={{
                bgcolor: '#19CD94', 
                color: 'white', 
                px: 3, 
                py: 1.2,
                borderRadius: 3,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': { bgcolor: 'rgba(25, 205, 148, 0.6)' }
              }} 
              onClick={() => navigate('/storage-solution')}
            >
              Adicionar Solução
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardPage;
