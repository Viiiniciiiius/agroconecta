import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminPage= () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminName: '',
    adminPwd: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    localStorage.setItem('adminName', formData.adminName);
    localStorage.setItem('adminPwd', formData.adminPwd);

    console.log('Dados salvos no localStorage:', {
      adminName: formData.adminName,
      adminPwd: formData.adminPwd,
    });
    
    setFormData({ adminName: '', adminPwd: '' });
    navigate('/');
  };

  return (
    <Container
      maxWidth="md"
      sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          p: { xs: 4, md: 6 },
          bgcolor: 'background.paper',
          borderRadius: 4,
          maxWidth: 450,
          width: '100%',
          mx: 'auto',
          background: 'linear-gradient(135deg, rgba(0,131,136,0.1), rgba(25, 205, 148, 0.1))'
        }}
      >
        <Typography variant="h4" fontWeight={600} color='rgba(25, 205, 148, 1)' gutterBottom sx={{ textAlign: 'center' }}>
          Admin Login
        </Typography>

        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            label="Admin"
            name="adminName"
            value={formData.adminName}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            name="adminPwd"
            type="password"
            value={formData.adminPwd}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              type="submit"
              sx={{
                bgcolor: '#19CD94',
                color: 'white',
                px: 4,
                py: 1,
                borderRadius: 3,
                fontSize: '1.2rem',
                fontWeight: 600,
                '&:hover': { bgcolor: 'rgba(25, 205, 148, 0.8)' }
              }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPage;