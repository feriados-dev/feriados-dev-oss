-- Feriados Municipais das Principais Cidades do Brasil (2024-2025)

-- São Paulo (SP)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de São Paulo', '2024-01-25', 2024, 'municipal', 'Fundação da cidade de São Paulo', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Consciência Negra', '2024-11-20', 2024, 'municipal', 'Feriado municipal de São Paulo', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de São Paulo', '2025-01-25', 2025, 'municipal', 'Fundação da cidade de São Paulo', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Consciência Negra', '2025-11-20', 2025, 'municipal', 'Feriado municipal de São Paulo', true
ON CONFLICT DO NOTHING;

-- Rio de Janeiro (RJ)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário do Rio de Janeiro', '2024-03-01', 2024, 'municipal', 'Fundação da cidade do Rio de Janeiro', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'São Jorge', '2024-04-23', 2024, 'municipal', 'Padroeiro do Rio de Janeiro', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Consciência Negra', '2024-11-20', 2024, 'municipal', 'Feriado municipal do Rio de Janeiro', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário do Rio de Janeiro', '2025-03-01', 2025, 'municipal', 'Fundação da cidade do Rio de Janeiro', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'São Jorge', '2025-04-23', 2025, 'municipal', 'Padroeiro do Rio de Janeiro', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Consciência Negra', '2025-11-20', 2025, 'municipal', 'Feriado municipal do Rio de Janeiro', true
ON CONFLICT DO NOTHING;

-- Brasília (DF)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Fundação de Brasília', '2024-04-21', 2024, 'municipal', 'Aniversário de Brasília', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Fundação de Brasília', '2025-04-21', 2025, 'municipal', 'Aniversário de Brasília', true
ON CONFLICT DO NOTHING;

-- Belo Horizonte (MG)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Belo Horizonte', '2024-12-12', 2024, 'municipal', 'Fundação de Belo Horizonte', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Belo Horizonte', '2025-12-12', 2025, 'municipal', 'Fundação de Belo Horizonte', true
ON CONFLICT DO NOTHING;

-- Curitiba (PR)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Curitiba', '2024-03-29', 2024, 'municipal', 'Fundação de Curitiba', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Curitiba', '2025-03-29', 2025, 'municipal', 'Fundação de Curitiba', true
ON CONFLICT DO NOTHING;

-- Porto Alegre (RS)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Porto Alegre', '2024-03-26', 2024, 'municipal', 'Fundação de Porto Alegre', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Nossa Senhora dos Navegantes', '2024-02-02', 2024, 'municipal', 'Padroeira de Porto Alegre', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Porto Alegre', '2025-03-26', 2025, 'municipal', 'Fundação de Porto Alegre', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Nossa Senhora dos Navegantes', '2025-02-02', 2025, 'municipal', 'Padroeira de Porto Alegre', true
ON CONFLICT DO NOTHING;

-- Recife (PE)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário do Recife', '2024-03-12', 2024, 'municipal', 'Fundação do Recife', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'São João', '2024-06-24', 2024, 'municipal', 'Feriado municipal do Recife', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário do Recife', '2025-03-12', 2025, 'municipal', 'Fundação do Recife', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'São João', '2025-06-24', 2025, 'municipal', 'Feriado municipal do Recife', true
ON CONFLICT DO NOTHING;

-- Fortaleza (CE)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Fortaleza', '2024-04-13', 2024, 'municipal', 'Fundação de Fortaleza', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Nossa Senhora da Assunção', '2024-08-15', 2024, 'municipal', 'Padroeira de Fortaleza', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Fortaleza', '2025-04-13', 2025, 'municipal', 'Fundação de Fortaleza', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Nossa Senhora da Assunção', '2025-08-15', 2025, 'municipal', 'Padroeira de Fortaleza', true
ON CONFLICT DO NOTHING;

-- Salvador (BA)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Salvador', '2024-03-29', 2024, 'municipal', 'Fundação de Salvador', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Salvador', '2025-03-29', 2025, 'municipal', 'Fundação de Salvador', true
ON CONFLICT DO NOTHING;

-- Manaus (AM)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Manaus', '2024-10-24', 2024, 'municipal', 'Elevação de Manaus à cidade', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Nossa Senhora da Conceição', '2024-12-08', 2024, 'municipal', 'Padroeira de Manaus', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Manaus', '2025-10-24', 2025, 'municipal', 'Elevação de Manaus à cidade', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Nossa Senhora da Conceição', '2025-12-08', 2025, 'municipal', 'Padroeira de Manaus', true
ON CONFLICT DO NOTHING;

-- Belém (PA)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Belém', '2024-01-12', 2024, 'municipal', 'Fundação de Belém', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Círio de Nazaré', '2024-10-13', 2024, 'municipal', 'Feriado municipal de Belém', false
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Belém', '2025-01-12', 2025, 'municipal', 'Fundação de Belém', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Círio de Nazaré', '2025-10-12', 2025, 'municipal', 'Feriado municipal de Belém', false
ON CONFLICT DO NOTHING;

-- Goiânia (GO)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Goiânia', '2024-10-24', 2024, 'municipal', 'Fundação de Goiânia', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Goiânia', '2025-10-24', 2025, 'municipal', 'Fundação de Goiânia', true
ON CONFLICT DO NOTHING;

-- Guarulhos (SP)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Guarulhos', '2024-12-08', 2024, 'municipal', 'Fundação de Guarulhos', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Guarulhos', '2025-12-08', 2025, 'municipal', 'Fundação de Guarulhos', true
ON CONFLICT DO NOTHING;

-- Campinas (SP)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Campinas', '2024-07-14', 2024, 'municipal', 'Fundação de Campinas', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Campinas', '2025-07-14', 2025, 'municipal', 'Fundação de Campinas', true
ON CONFLICT DO NOTHING;

-- Duque de Caxias (RJ)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Duque de Caxias', '2024-03-31', 2024, 'municipal', 'Emancipação de Duque de Caxias', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Duque de Caxias', '2025-03-31', 2025, 'municipal', 'Emancipação de Duque de Caxias', true
ON CONFLICT DO NOTHING;

-- São Gonçalo (RJ)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de São Gonçalo', '2024-09-22', 2024, 'municipal', 'Emancipação de São Gonçalo', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de São Gonçalo', '2025-09-22', 2025, 'municipal', 'Emancipação de São Gonçalo', true
ON CONFLICT DO NOTHING;

-- Natal (RN)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Natal', '2024-12-25', 2024, 'municipal', 'Fundação de Natal', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Natal', '2025-12-25', 2025, 'municipal', 'Fundação de Natal', true
ON CONFLICT DO NOTHING;

-- Campo Grande (MS)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Campo Grande', '2024-08-26', 2024, 'municipal', 'Fundação de Campo Grande', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Campo Grande', '2025-08-26', 2025, 'municipal', 'Fundação de Campo Grande', true
ON CONFLICT DO NOTHING;

-- Teresina (PI)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Teresina', '2024-08-16', 2024, 'municipal', 'Fundação de Teresina', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Teresina', '2025-08-16', 2025, 'municipal', 'Fundação de Teresina', true
ON CONFLICT DO NOTHING;

-- São Luís (MA)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de São Luís', '2024-09-08', 2024, 'municipal', 'Fundação de São Luís', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de São Luís', '2025-09-08', 2025, 'municipal', 'Fundação de São Luís', true
ON CONFLICT DO NOTHING;

-- Maceió (AL)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Maceió', '2024-12-05', 2024, 'municipal', 'Emancipação política de Maceió', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Maceió', '2025-12-05', 2025, 'municipal', 'Emancipação política de Maceió', true
ON CONFLICT DO NOTHING;

-- João Pessoa (PB)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de João Pessoa', '2024-08-05', 2024, 'municipal', 'Fundação de João Pessoa', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de João Pessoa', '2025-08-05', 2025, 'municipal', 'Fundação de João Pessoa', true
ON CONFLICT DO NOTHING;

-- Jaboatão dos Guararapes (PE)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Jaboatão dos Guararapes', '2024-04-02', 2024, 'municipal', 'Emancipação de Jaboatão', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Jaboatão dos Guararapes', '2025-04-02', 2025, 'municipal', 'Emancipação de Jaboatão', true
ON CONFLICT DO NOTHING;

-- Osasco (SP)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Osasco', '2024-04-19', 2024, 'municipal', 'Emancipação de Osasco', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Osasco', '2025-04-19', 2025, 'municipal', 'Emancipação de Osasco', true
ON CONFLICT DO NOTHING;

-- Uberlândia (MG)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Uberlândia', '2024-08-31', 2024, 'municipal', 'Elevação à cidade', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Uberlândia', '2025-08-31', 2025, 'municipal', 'Elevação à cidade', true
ON CONFLICT DO NOTHING;

-- Contagem (MG)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Contagem', '2024-08-28', 2024, 'municipal', 'Emancipação de Contagem', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Contagem', '2025-08-28', 2025, 'municipal', 'Emancipação de Contagem', true
ON CONFLICT DO NOTHING;

-- Sorocaba (SP)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Sorocaba', '2024-08-15', 2024, 'municipal', 'Fundação de Sorocaba', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Sorocaba', '2025-08-15', 2025, 'municipal', 'Fundação de Sorocaba', true
ON CONFLICT DO NOTHING;

-- Aracaju (SE)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Aracaju', '2024-03-17', 2024, 'municipal', 'Fundação de Aracaju', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Aracaju', '2025-03-17', 2025, 'municipal', 'Fundação de Aracaju', true
ON CONFLICT DO NOTHING;

-- Feira de Santana (BA)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Feira de Santana', '2024-10-18', 2024, 'municipal', 'Elevação à cidade', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Feira de Santana', '2025-10-18', 2025, 'municipal', 'Elevação à cidade', true
ON CONFLICT DO NOTHING;

-- Londrina (PR)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Londrina', '2024-12-10', 2024, 'municipal', 'Fundação de Londrina', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Londrina', '2025-12-10', 2025, 'municipal', 'Fundação de Londrina', true
ON CONFLICT DO NOTHING;

-- Joinville (SC)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Joinville', '2024-03-09', 2024, 'municipal', 'Fundação de Joinville', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Joinville', '2025-03-09', 2025, 'municipal', 'Fundação de Joinville', true
ON CONFLICT DO NOTHING;

-- Aparecida de Goiânia (GO)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Aparecida de Goiânia', '2024-11-11', 2024, 'municipal', 'Emancipação de Aparecida de Goiânia', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Aparecida de Goiânia', '2025-11-11', 2025, 'municipal', 'Emancipação de Aparecida de Goiânia', true
ON CONFLICT DO NOTHING;

-- Ribeirão Preto (SP)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Ribeirão Preto', '2024-06-19', 2024, 'municipal', 'Fundação de Ribeirão Preto', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário de Ribeirão Preto', '2025-06-19', 2025, 'municipal', 'Fundação de Ribeirão Preto', true
ON CONFLICT DO NOTHING;

-- Link municipal holidays with municipalities
-- This will be done dynamically based on municipality names in the holiday descriptions
INSERT INTO holiday_locations (holiday_id, location_id)
SELECT DISTINCT h.id, l.id
FROM holidays h
CROSS JOIN locations l
WHERE h.type = 'municipal'
  AND l.type = 'municipality'
  AND (
    h.description LIKE '%' || l.name || '%'
    OR (h.name LIKE '%São Paulo%' AND l.name = 'São Paulo' AND l.state_code = 'SP')
    OR (h.name LIKE '%Rio de Janeiro%' AND l.name = 'Rio de Janeiro' AND l.state_code = 'RJ')
    OR (h.name LIKE '%Brasília%' AND l.name = 'Brasília' AND l.state_code = 'DF')
    OR (h.name LIKE '%Belo Horizonte%' AND l.name = 'Belo Horizonte')
    OR (h.name LIKE '%Curitiba%' AND l.name = 'Curitiba')
    OR (h.name LIKE '%Porto Alegre%' AND l.name = 'Porto Alegre')
    OR (h.name LIKE '%Recife%' AND l.name = 'Recife')
    OR (h.name LIKE '%Fortaleza%' AND l.name = 'Fortaleza')
    OR (h.name LIKE '%Salvador%' AND l.name = 'Salvador')
    OR (h.name LIKE '%Manaus%' AND l.name = 'Manaus')
    OR (h.name LIKE '%Belém%' AND l.name = 'Belém')
    OR (h.name LIKE '%Goiânia%' AND l.name = 'Goiânia')
    OR (h.name LIKE '%Guarulhos%' AND l.name = 'Guarulhos')
    OR (h.name LIKE '%Campinas%' AND l.name = 'Campinas')
    OR (h.name LIKE '%Duque de Caxias%' AND l.name = 'Duque de Caxias')
    OR (h.name LIKE '%São Gonçalo%' AND l.name = 'São Gonçalo')
    OR (h.name LIKE '%Natal%' AND l.name = 'Natal' AND h.type = 'municipal')
    OR (h.name LIKE '%Campo Grande%' AND l.name = 'Campo Grande')
    OR (h.name LIKE '%Teresina%' AND l.name = 'Teresina')
    OR (h.name LIKE '%São Luís%' AND l.name = 'São Luís')
    OR (h.name LIKE '%Maceió%' AND l.name = 'Maceió')
    OR (h.name LIKE '%João Pessoa%' AND l.name = 'João Pessoa')
    OR (h.name LIKE '%Jaboatão%' AND l.name LIKE 'Jaboatão%')
    OR (h.name LIKE '%Osasco%' AND l.name = 'Osasco')
    OR (h.name LIKE '%Uberlândia%' AND l.name = 'Uberlândia')
    OR (h.name LIKE '%Contagem%' AND l.name = 'Contagem')
    OR (h.name LIKE '%Sorocaba%' AND l.name = 'Sorocaba')
    OR (h.name LIKE '%Aracaju%' AND l.name = 'Aracaju')
    OR (h.name LIKE '%Feira de Santana%' AND l.name = 'Feira de Santana')
    OR (h.name LIKE '%Londrina%' AND l.name = 'Londrina')
    OR (h.name LIKE '%Joinville%' AND l.name = 'Joinville')
    OR (h.name LIKE '%Aparecida de Goiânia%' AND l.name = 'Aparecida de Goiânia')
    OR (h.name LIKE '%Ribeirão Preto%' AND l.name = 'Ribeirão Preto')
  )
ON CONFLICT DO NOTHING;
