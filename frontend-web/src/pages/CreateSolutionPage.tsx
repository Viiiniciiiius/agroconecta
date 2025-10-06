import React, { useState } from 'react';
import { 
  Container, Box, TextField, Typography, Button, MenuItem, 
  FormControl, InputLabel, Select, Grid 
} from '@mui/material';
import { motion } from 'framer-motion';
import { createSolution } from "../api/solution";
import { CreateSolutionForm } from '../types/solution';
import { SelectChangeEvent } from '@mui/material/Select';
import { CATEGORIES_CONFIG, CategoryType } from '../config/categories';

export const CreateSolutionPage: React.FC = () => {
  const [formData, setFormData] = useState<CreateSolutionForm>({
    title: '',
    category: 'product',
    subcategory: '',
    description: '',
    priceDollar: undefined,
    link: '',
    publishDate: new Date().toISOString(),
    dataColeta: '',
    starRating: undefined,
    ownerContact: {
      email: '',
      phone: '',
      other: ''
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | 
       React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;

    if (name?.startsWith('ownerContact.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        ownerContact: {
          ...prev.ownerContact,
          [key]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name as string]: value
      }));
    }
  };

  const handleSelectChange = (
    e: SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceString = formData.priceDollar === undefined ? '' : String(formData.priceDollar);
    const parsedPriceDollar = parseFloat(priceString);

    const ratingString = formData.starRating === undefined ? '' : String(formData.starRating);
    const parsedStarRating = parseInt(ratingString, 10);

    const dataToSend: CreateSolutionForm = {
      ...formData,
      priceDollar: isNaN(parsedPriceDollar) ? undefined : parsedPriceDollar,
      starRating: isNaN(parsedStarRating) ? undefined : parsedStarRating,
      // publishDate é mantido como objeto Date, JSON.stringify cuidará da conversão para ISO string
    };

    try {
      console.log('📤 Enviando dados do formulário:', dataToSend);
      await createSolution(dataToSend);
      // TODO: Adicionar feedback para o usuário (ex: redirect, mensagem de sucesso)
      console.log('✅ Solução criada com sucesso!', dataToSend); 
    } catch (error) {
      console.error('❌ Erro ao criar solução:', error);
      // TODO: Mostrar erro para o usuário
    }
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box 
          sx={{ 
            p: { xs: 4, md: 6 },
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            boxShadow: 4,
            maxWidth: 600,
            mx: 'auto',
            background: 'linear-gradient(135deg, rgba(0,131,136,0.1), rgba(25, 205, 148, 0.1))'
          }}
        >
          <Typography variant="h4" fontWeight={600} color='rgba(25, 205, 148, 1)' gutterBottom sx={{ textAlign: 'center' }}>
            Adicione uma nova solução ao banco de dados
          </Typography>

          <Box component='form' onSubmit={handleSubmit}>
            <TextField
              label="Título"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Data da Coleta"
              name="dataColeta"
              type="date"
              value={formData.dataColeta || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />

            <FormControl fullWidth required margin="normal">
              <InputLabel id="category-label">Categoria</InputLabel>
              <Select
                labelId="category-label"
                label="Categoria"
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
              >
                {Object.entries(CATEGORIES_CONFIG).map(([key, config]) => {
                  const cat = config as { label: string };
                  return (
                    <MenuItem key={key} value={key}>
                      {cat.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            {/* Subcategoria - só aparece se uma categoria for selecionada */}
            {formData.category && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="subcategory-label">Subcategoria (Opcional)</InputLabel>
                <Select
                  labelId="subcategory-label"
                  label="Subcategoria (Opcional)"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="">
                    <em>Selecione uma subcategoria</em>
                  </MenuItem>
                  {Object.entries(CATEGORIES_CONFIG[formData.category as CategoryType]?.subcategories || {}).map(([key, config]) => {
                    const sub = config as { label: string };
                    return (
                      <MenuItem key={key} value={key}>
                        {sub.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}

            <TextField
              label="Detalhes"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />

            <TextField
              label="Preço (em $)"
              name="priceDollar"
              type="number"
              inputProps={{ inputMode: 'decimal', pattern: '^[0-9.,]*$' }}
              value={formData.priceDollar || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Link do produto/serviço"
              name="link"
              value={formData.link}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Avaliação (de 0 a 5)"
              name="starRating"
              type="number"
              inputProps={{ inputMode: 'decimal', pattern: '^[0-9.,]*$' }}
              value={formData.starRating || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <Typography variant="h6" sx={{ mt: 3, color: '#19CD94' }}>
              Contato do Proprietário (Opcional)
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="E-mail"
                  name="ownerContact.email"
                  value={formData.ownerContact?.email || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Telefone"
                  name="ownerContact.phone"
                  value={formData.ownerContact?.phone || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Outro"
                  name="ownerContact.other"
                  value={formData.ownerContact?.other || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button 
                type="submit"
                sx={{
                  bgcolor: '#19CD94',
                  color: 'white',
                  px: 4,
                  py: 1.2,
                  borderRadius: 3,
                  fontSize: '1rem',
                  fontWeight: 600,
                  transition: '0.3s',
                  '&:hover': { bgcolor: 'rgba(25, 205, 148, 0.6)', transform: 'scale(1.05)' }
                }}
              >
                Adicionar Solução
              </Button>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default CreateSolutionPage;
