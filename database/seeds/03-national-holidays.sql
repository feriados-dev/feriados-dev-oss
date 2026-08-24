-- Seed: Feriados Nacionais Brasileiros 2024-2025
-- Fonte: Ministério da Gestão e da Inovação em Serviços Públicos
-- Portaria MGI nº 9.783/2024 (DOU)

-- Feriados Nacionais 2024
INSERT INTO holidays (name, date, year, type, description, is_fixed) VALUES
('Confraternização Universal', '2024-01-01', 2024, 'national', 'Ano Novo', true),
('Carnaval', '2024-02-13', 2024, 'optional', 'Segunda-feira de Carnaval - Ponto Facultativo', false),
('Paixão de Cristo', '2024-03-29', 2024, 'national', 'Sexta-feira Santa', false),
('Tiradentes', '2024-04-21', 2024, 'national', 'Dia de Tiradentes', true),
('Dia do Trabalho', '2024-05-01', 2024, 'national', 'Dia Mundial do Trabalho', true),
('Corpus Christi', '2024-05-30', 2024, 'optional', 'Ponto Facultativo', false),
('Independência do Brasil', '2024-09-07', 2024, 'national', 'Dia da Independência', true),
('Nossa Senhora Aparecida', '2024-10-12', 2024, 'national', 'Padroeira do Brasil', true),
('Finados', '2024-11-02', 2024, 'national', 'Dia de Finados', true),
('Proclamação da República', '2024-11-15', 2024, 'national', 'Dia da Proclamação da República', true),
('Dia da Consciência Negra', '2024-11-20', 2024, 'national', 'Dia Nacional de Zumbi e da Consciência Negra', true),
('Natal', '2024-12-25', 2024, 'national', 'Nascimento de Jesus Cristo', true)
ON CONFLICT DO NOTHING;

-- Feriados Nacionais 2025
INSERT INTO holidays (name, date, year, type, description, is_fixed) VALUES
('Confraternização Universal', '2025-01-01', 2025, 'national', 'Ano Novo', true),
('Carnaval', '2025-03-03', 2025, 'optional', 'Segunda-feira de Carnaval - Ponto Facultativo', false),
('Carnaval', '2025-03-04', 2025, 'optional', 'Terça-feira de Carnaval - Ponto Facultativo', false),
('Paixão de Cristo', '2025-04-18', 2025, 'national', 'Sexta-feira Santa', false),
('Tiradentes', '2025-04-21', 2025, 'national', 'Dia de Tiradentes', true),
('Dia do Trabalho', '2025-05-01', 2025, 'national', 'Dia Mundial do Trabalho', true),
('Corpus Christi', '2025-06-19', 2025, 'optional', 'Ponto Facultativo', false),
('Independência do Brasil', '2025-09-07', 2025, 'national', 'Dia da Independência', true),
('Nossa Senhora Aparecida', '2025-10-12', 2025, 'national', 'Padroeira do Brasil', true),
('Finados', '2025-11-02', 2025, 'national', 'Dia de Finados', true),
('Proclamação da República', '2025-11-15', 2025, 'national', 'Dia da Proclamação da República', true),
('Dia da Consciência Negra', '2025-11-20', 2025, 'national', 'Dia Nacional de Zumbi e da Consciência Negra', true),
('Natal', '2025-12-25', 2025, 'national', 'Nascimento de Jesus Cristo', true)
ON CONFLICT DO NOTHING;

-- Vincular feriados nacionais ao Brasil (aplicam-se a todo o país)
INSERT INTO holiday_locations (holiday_id, location_id)
SELECT h.id, l.id
FROM holidays h
CROSS JOIN locations l
WHERE h.type = 'national'
  AND l.type = 'country'
  AND l.code = 'BR'
  AND h.year IN (2024, 2025)
ON CONFLICT (holiday_id, location_id) DO NOTHING;

-- Pontos Facultativos Adicionais 2025
INSERT INTO holidays (name, date, year, type, description, is_fixed) VALUES
('Quarta-feira de Cinzas', '2025-03-05', 2025, 'optional', 'Ponto Facultativo até 14h', false),
('Sexta-feira após Corpus Christi', '2025-06-20', 2025, 'optional', 'Ponto Facultativo', false),
('Dia do Servidor Público', '2025-10-27', 2025, 'optional', 'Ponto Facultativo (transferido)', true),
('Véspera de Natal', '2025-12-24', 2025, 'optional', 'Ponto Facultativo após 13h', true),
('Véspera de Ano Novo', '2025-12-31', 2025, 'optional', 'Ponto Facultativo após 13h', true)
ON CONFLICT DO NOTHING;

-- Vincular pontos facultativos ao Brasil
INSERT INTO holiday_locations (holiday_id, location_id)
SELECT h.id, l.id
FROM holidays h
CROSS JOIN locations l
WHERE h.type = 'optional'
  AND l.type = 'country'
  AND l.code = 'BR'
  AND h.year = 2025
ON CONFLICT (holiday_id, location_id) DO NOTHING;
