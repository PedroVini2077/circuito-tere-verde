const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Trilha = require('../models/Trilha');
const Evento = require('../models/Evento');
const connectDB = require('../config/database');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Limpar dados existentes
    await User.deleteMany();
    await Trilha.deleteMany();
    await Evento.deleteMany();

    console.log('🗑️  Dados antigos removidos');

    // Criar usuário admin
    const admin = await User.create({
      nome: 'Super Administrador',
      email: 'admin@tereverde.com',
      senha: 'admin123',
      role: 'admin',
      superAdmin: true,
    });
    
    console.log('✅ Admin criado');

    // Criar trilhas
    const trilhas = await Trilha.insertMany([
      {
        nome: 'Trilha da Pedra do Sino',
        descricao: 'Trilha desafiadora com vista panorâmica incrível de Teresópolis',
        dificuldade: 'difícil',
        distancia: 14,
        duracao: '6-8 horas',
        localizacao: 'Parque Nacional da Serra dos Órgãos',
        horarioFuncionamento: {
          abertura: '07:00',
          fechamento: '17:00',
        },
        disponivel: true,
        capacidadeMaxima: 30,
        criadoPor: admin._id,
      },
      {
        nome: 'Trilha Cartão Postal',
        descricao: 'Trilha leve com vista para o Dedo de Deus',
        dificuldade: 'fácil',
        distancia: 3,
        duracao: '2 horas',
        localizacao: 'Parque Nacional da Serra dos Órgãos',
        horarioFuncionamento: {
          abertura: '08:00',
          fechamento: '16:00',
        },
        disponivel: true,
        capacidadeMaxima: 50,
        criadoPor: admin._id,
      },
      {
        nome: 'Trilha da Cachoeira Véu da Noiva',
        descricao: 'Trilha moderada até uma bela cachoeira',
        dificuldade: 'moderada',
        distancia: 5,
        duracao: '3 horas',
        localizacao: 'Região de Três Picos',
        horarioFuncionamento: {
          abertura: '08:00',
          fechamento: '17:00',
        },
        disponivel: true,
        capacidadeMaxima: 40,
        criadoPor: admin._id,
      },
    ]);

    console.log('✅ Trilhas criadas');

    // Criar eventos
    const eventos = await Evento.insertMany([
      {
        titulo: 'Workshop de Fotografia na Natureza',
        descricao: 'Aprenda técnicas de fotografia em ambientes naturais',
        dataInicio: new Date('2024-12-15'),
        dataFim: new Date('2024-12-15'),
        horario: '09:00 - 13:00',
        local: 'Centro de Visitantes',
        capacidade: 20,
        tipo: 'workshop',
        ativo: true,
        criadoPor: admin._id,
      },
      {
        titulo: 'Observação de Aves',
        descricao: 'Passeio guiado para observação da fauna local',
        dataInicio: new Date('2024-12-20'),
        dataFim: new Date('2024-12-20'),
        horario: '06:00 - 10:00',
        local: 'Trilha das Bromélias',
        capacidade: 15,
        tipo: 'observação',
        ativo: true,
        criadoPor: admin._id,
      },
      {
        titulo: 'Palestra: Preservação da Mata Atlântica',
        descricao: 'Importância da conservação do bioma local',
        dataInicio: new Date('2024-12-18'),
        dataFim: new Date('2024-12-18'),
        horario: '19:00 - 21:00',
        local: 'Auditório Municipal',
        capacidade: 100,
        tipo: 'palestra',
        ativo: true,
        criadoPor: admin._id,
      },
    ]);

    console.log('✅ Eventos criados');
    console.log('\n🎉 Seed concluído com sucesso!');
    console.log('\n📧 Login do admin:');
    console.log('   Email: admin@tereverde.com');
    console.log('   Senha: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error);
    process.exit(1);
  }
};

seedData();