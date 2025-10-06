import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../App.css';
import { ADMIN_CONFIG } from '../config/admin';

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
                transition: '0.3s',
                '&:hover': { bgcolor: 'rgba(25, 205, 148, 0.6)', transform: 'scale(1.05)' }
              }} 
              onClick={() => navigate('/solutions')}
            >
              Ver Soluções
            </Button>

            {/* Botão "Adicionar Solução" só aparece se ADMIN_MODE for true */}
            {ADMIN_CONFIG.ADMIN_MODE && (
              <Button
                sx={{
                  bgcolor: '#19CD94', 
                  color: 'white', 
                  px: 3, py: 1.2,
                  borderRadius: 3,
                  fontSize: '1rem',
                  fontWeight: 600,
                  transition: '0.3s',
                  '&:hover': { bgcolor: 'rgba(25, 205, 148, 0.6)', transform: 'scale(1.05)' }
                }} 
                onClick={() => navigate('/storage-solution')}
              >
                Adicionar Solução
              </Button>
            )}
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default DashboardPage;
