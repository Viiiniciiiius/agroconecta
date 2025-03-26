import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../App.css';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box 
          sx={{ 
            textAlign: 'center', 
            p: { xs: 4, md: 6 }, 
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            boxShadow: 4,
            maxWidth: 600,
            background: 'linear-gradient(135deg, rgba(0,131,136,0.1), rgba(136,0,34,0.1))'
          }}
        >
          <Typography variant="h4" fontWeight={600} color='#880022' gutterBottom>
            Banco de Soluções do AgroConecta
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Encontre e compartilhe soluções inovadoras para o agronegócio.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 12 }}>
            <Button
              sx={{
                bgcolor: '#880022', 
                color: 'white', 
                px: 3, py: 1.2,
                borderRadius: 3,
                fontSize: '1rem',
                fontWeight: 600,
                transition: '0.3s',
                '&:hover': { bgcolor: 'rgba(136, 0, 34, 0.8)', transform: 'scale(1.05)' }
              }} 
              onClick={() => navigate('/solutions')}
            >
              Ver Soluções
            </Button>

            <Button
              sx={{
                bgcolor: '#880022', 
                color: 'white', 
                px: 3, py: 1.2,
                borderRadius: 3,
                fontSize: '1rem',
                fontWeight: 600,
                transition: '0.3s',
                '&:hover': { bgcolor: 'rgba(136, 0, 34, 0.8)', transform: 'scale(1.05)' }
              }} 
              onClick={() => navigate('/storage-solution')}
            >
              Adicionar Solução
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default DashboardPage;
