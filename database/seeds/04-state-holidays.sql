-- Feriados Estaduais do Brasil (2024-2025)
-- Fonte: Leis estaduais e decretos oficiais

-- Acre (AC)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia do Evangélico', '2024-01-23', 2024, 'state', 'Feriado estadual do Acre', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário do Acre', '2024-06-15', 2024, 'state', 'Data magna do Estado do Acre', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Início da Revolução Acreana', '2024-08-06', 2024, 'state', 'Feriado estadual do Acre', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Assinatura do Tratado de Petrópolis', '2024-11-17', 2024, 'state', 'Feriado estadual do Acre', true
ON CONFLICT DO NOTHING;

-- Alagoas (AL)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'São João', '2024-06-24', 2024, 'state', 'Feriado estadual de Alagoas', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'São Pedro', '2024-06-29', 2024, 'state', 'Feriado estadual de Alagoas', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Emancipação Política de Alagoas', '2024-09-16', 2024, 'state', 'Feriado estadual de Alagoas', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia da Consciência Negra', '2024-11-20', 2024, 'state', 'Feriado estadual de Alagoas', true
ON CONFLICT DO NOTHING;

-- Amazonas (AM)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Elevação do Amazonas à categoria de província', '2024-09-05', 2024, 'state', 'Feriado estadual do Amazonas', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia da Consciência Negra', '2024-11-20', 2024, 'state', 'Feriado estadual do Amazonas', true
ON CONFLICT DO NOTHING;

-- Bahia (BA)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Independência da Bahia', '2024-07-02', 2024, 'state', 'Feriado estadual da Bahia', true
ON CONFLICT DO NOTHING;

-- Ceará (CE)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'São José', '2024-03-19', 2024, 'state', 'Feriado estadual do Ceará e padroeiro de Fortaleza', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Abolição da escravidão no Ceará', '2024-03-25', 2024, 'state', 'Feriado estadual do Ceará', true
ON CONFLICT DO NOTHING;

-- Distrito Federal (DF)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Fundação de Brasília', '2024-04-21', 2024, 'state', 'Aniversário de Brasília', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia do Evangélico', '2024-11-30', 2024, 'state', 'Feriado distrital', true
ON CONFLICT DO NOTHING;

-- Espírito Santo (ES)
-- Não possui feriados estaduais além dos nacionais

-- Goiás (GO)
-- Não possui feriados estaduais além dos nacionais

-- Maranhão (MA)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Adesão do Maranhão à Independência do Brasil', '2024-07-28', 2024, 'state', 'Feriado estadual do Maranhão', true
ON CONFLICT DO NOTHING;

-- Mato Grosso (MT)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia da Consciência Negra', '2024-11-20', 2024, 'state', 'Feriado estadual do Mato Grosso', true
ON CONFLICT DO NOTHING;

-- Mato Grosso do Sul (MS)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Criação do estado', '2024-10-11', 2024, 'state', 'Feriado estadual do Mato Grosso do Sul', true
ON CONFLICT DO NOTHING;

-- Minas Gerais (MG)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Tiradentes', '2024-04-21', 2024, 'state', 'Dia de Tiradentes (feriado nacional e especial para MG)', true
ON CONFLICT DO NOTHING;

-- Pará (PA)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Adesão do Grão-Pará à Independência do Brasil', '2024-08-15', 2024, 'state', 'Feriado estadual do Pará', true
ON CONFLICT DO NOTHING;

-- Paraíba (PB)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Fundação do Estado', '2024-08-05', 2024, 'state', 'Feriado estadual da Paraíba', true
ON CONFLICT DO NOTHING;

-- Paraná (PR)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Emancipação do Paraná', '2024-12-19', 2024, 'state', 'Feriado estadual do Paraná', true
ON CONFLICT DO NOTHING;

-- Pernambuco (PE)
-- Primeira data do movimento constitucionalista (1817)
-- Não há feriado estadual oficial além dos nacionais

-- Piauí (PI)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia da Batalha do Jenipapo', '2024-03-13', 2024, 'state', 'Feriado estadual do Piauí', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia do Piauí', '2024-10-19', 2024, 'state', 'Aniversário do estado', true
ON CONFLICT DO NOTHING;

-- Rio de Janeiro (RJ)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia de São Jorge', '2024-04-23', 2024, 'state', 'Padroeiro do Rio de Janeiro', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia do Comércio', '2024-10-15', 2024, 'state', 'Feriado estadual do Rio de Janeiro', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia da Consciência Negra', '2024-11-20', 2024, 'state', 'Feriado estadual do Rio de Janeiro', true
ON CONFLICT DO NOTHING;

-- Rio Grande do Norte (RN)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Mártires de Cunhaú e Uruaçu', '2024-10-03', 2024, 'state', 'Feriado estadual do Rio Grande do Norte', true
ON CONFLICT DO NOTHING;

-- Rio Grande do Sul (RS)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Revolução Farroupilha', '2024-09-20', 2024, 'state', 'Feriado estadual do Rio Grande do Sul', true
ON CONFLICT DO NOTHING;

-- Rondônia (RO)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Criação do estado', '2024-01-04', 2024, 'state', 'Feriado estadual de Rondônia', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia do Evangélico', '2024-06-18', 2024, 'state', 'Feriado estadual de Rondônia', true
ON CONFLICT DO NOTHING;

-- Roraima (RR)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Criação do estado', '2024-10-05', 2024, 'state', 'Feriado estadual de Roraima', true
ON CONFLICT DO NOTHING;

-- Santa Catarina (SC)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Criação da capitania', '2024-08-11', 2024, 'state', 'Catarina de Alexandria - Padroeira do estado', true
ON CONFLICT DO NOTHING;

-- São Paulo (SP)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Revolução Constitucionalista de 1932', '2024-07-09', 2024, 'state', 'Feriado estadual de São Paulo', true
ON CONFLICT DO NOTHING;

-- Sergipe (SE)
-- Não possui feriados estaduais além dos nacionais

-- Tocantins (TO)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Autonomia do Estado', '2024-03-18', 2024, 'state', 'Instalação de Tocantins', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Nossa Senhora da Natividade', '2024-09-08', 2024, 'state', 'Padroeira do Tocantins', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Criação do estado', '2024-10-05', 2024, 'state', 'Criação do estado do Tocantins', true
ON CONFLICT DO NOTHING;

-- ========================================
-- Feriados Estaduais 2025
-- ========================================

-- Acre (AC)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia do Evangélico', '2025-01-23', 2025, 'state', 'Feriado estadual do Acre', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Aniversário do Acre', '2025-06-15', 2025, 'state', 'Data magna do Estado do Acre', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Início da Revolução Acreana', '2025-08-06', 2025, 'state', 'Feriado estadual do Acre', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Assinatura do Tratado de Petrópolis', '2025-11-17', 2025, 'state', 'Feriado estadual do Acre', true
ON CONFLICT DO NOTHING;

-- Alagoas (AL)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'São João', '2025-06-24', 2025, 'state', 'Feriado estadual de Alagoas', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'São Pedro', '2025-06-29', 2025, 'state', 'Feriado estadual de Alagoas', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Emancipação Política de Alagoas', '2025-09-16', 2025, 'state', 'Feriado estadual de Alagoas', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia da Consciência Negra', '2025-11-20', 2025, 'state', 'Feriado estadual de Alagoas', true
ON CONFLICT DO NOTHING;

-- Amazonas (AM)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Elevação do Amazonas à categoria de província', '2025-09-05', 2025, 'state', 'Feriado estadual do Amazonas', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia da Consciência Negra', '2025-11-20', 2025, 'state', 'Feriado estadual do Amazonas', true
ON CONFLICT DO NOTHING;

-- Bahia (BA)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Independência da Bahia', '2025-07-02', 2025, 'state', 'Feriado estadual da Bahia', true
ON CONFLICT DO NOTHING;

-- Ceará (CE)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'São José', '2025-03-19', 2025, 'state', 'Feriado estadual do Ceará e padroeiro de Fortaleza', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Abolição da escravidão no Ceará', '2025-03-25', 2025, 'state', 'Feriado estadual do Ceará', true
ON CONFLICT DO NOTHING;

-- Distrito Federal (DF)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Fundação de Brasília', '2025-04-21', 2025, 'state', 'Aniversário de Brasília', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia do Evangélico', '2025-11-30', 2025, 'state', 'Feriado distrital', true
ON CONFLICT DO NOTHING;

-- Maranhão (MA)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Adesão do Maranhão à Independência do Brasil', '2025-07-28', 2025, 'state', 'Feriado estadual do Maranhão', true
ON CONFLICT DO NOTHING;

-- Mato Grosso (MT)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia da Consciência Negra', '2025-11-20', 2025, 'state', 'Feriado estadual do Mato Grosso', true
ON CONFLICT DO NOTHING;

-- Mato Grosso do Sul (MS)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Criação do estado', '2025-10-11', 2025, 'state', 'Feriado estadual do Mato Grosso do Sul', true
ON CONFLICT DO NOTHING;

-- Pará (PA)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Adesão do Grão-Pará à Independência do Brasil', '2025-08-15', 2025, 'state', 'Feriado estadual do Pará', true
ON CONFLICT DO NOTHING;

-- Paraíba (PB)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Fundação do Estado', '2025-08-05', 2025, 'state', 'Feriado estadual da Paraíba', true
ON CONFLICT DO NOTHING;

-- Paraná (PR)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Emancipação do Paraná', '2025-12-19', 2025, 'state', 'Feriado estadual do Paraná', true
ON CONFLICT DO NOTHING;

-- Piauí (PI)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia da Batalha do Jenipapo', '2025-03-13', 2025, 'state', 'Feriado estadual do Piauí', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia do Piauí', '2025-10-19', 2025, 'state', 'Aniversário do estado', true
ON CONFLICT DO NOTHING;

-- Rio de Janeiro (RJ)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia de São Jorge', '2025-04-23', 2025, 'state', 'Padroeiro do Rio de Janeiro', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia do Comércio', '2025-10-15', 2025, 'state', 'Feriado estadual do Rio de Janeiro', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia da Consciência Negra', '2025-11-20', 2025, 'state', 'Feriado estadual do Rio de Janeiro', true
ON CONFLICT DO NOTHING;

-- Rio Grande do Norte (RN)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Mártires de Cunhaú e Uruaçu', '2025-10-03', 2025, 'state', 'Feriado estadual do Rio Grande do Norte', true
ON CONFLICT DO NOTHING;

-- Rio Grande do Sul (RS)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Revolução Farroupilha', '2025-09-20', 2025, 'state', 'Feriado estadual do Rio Grande do Sul', true
ON CONFLICT DO NOTHING;

-- Rondônia (RO)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Criação do estado', '2025-01-04', 2025, 'state', 'Feriado estadual de Rondônia', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Dia do Evangélico', '2025-06-18', 2025, 'state', 'Feriado estadual de Rondônia', true
ON CONFLICT DO NOTHING;

-- Roraima (RR)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Criação do estado', '2025-10-05', 2025, 'state', 'Feriado estadual de Roraima', true
ON CONFLICT DO NOTHING;

-- Santa Catarina (SC)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Criação da capitania', '2025-08-11', 2025, 'state', 'Catarina de Alexandria - Padroeira do estado', true
ON CONFLICT DO NOTHING;

-- São Paulo (SP)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Revolução Constitucionalista de 1932', '2025-07-09', 2025, 'state', 'Feriado estadual de São Paulo', true
ON CONFLICT DO NOTHING;

-- Tocantins (TO)
INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Autonomia do Estado', '2025-03-18', 2025, 'state', 'Instalação de Tocantins', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Nossa Senhora da Natividade', '2025-09-08', 2025, 'state', 'Padroeira do Tocantins', true
ON CONFLICT DO NOTHING;

INSERT INTO holidays (name, date, year, type, description, is_fixed)
SELECT 'Criação do estado', '2025-10-05', 2025, 'state', 'Criação do estado do Tocantins', true
ON CONFLICT DO NOTHING;

-- Link holidays with states
INSERT INTO holiday_locations (holiday_id, location_id)
SELECT h.id, l.id
FROM holidays h
CROSS JOIN locations l
WHERE h.type = 'state'
  AND l.type = 'state'
  AND (
    (h.description LIKE '%' || l.name || '%')
    OR (h.description LIKE '%Acre%' AND l.code = 'AC')
    OR (h.description LIKE '%Alagoas%' AND l.code = 'AL')
    OR (h.description LIKE '%Amazonas%' AND l.code = 'AM')
    OR (h.description LIKE '%Bahia%' AND l.code = 'BA')
    OR (h.description LIKE '%Ceará%' AND l.code = 'CE')
    OR (h.description LIKE '%Brasília%' AND l.code = 'DF')
    OR (h.description LIKE '%distrital%' AND l.code = 'DF')
    OR (h.description LIKE '%Maranhão%' AND l.code = 'MA')
    OR (h.description LIKE '%Mato Grosso do Sul%' AND l.code = 'MS')
    OR (h.description LIKE '%Mato Grosso%' AND l.code = 'MT' AND h.description NOT LIKE '%Sul%')
    OR (h.description LIKE '%Pará%' AND l.code = 'PA')
    OR (h.description LIKE '%Paraíba%' AND l.code = 'PB')
    OR (h.description LIKE '%Paraná%' AND l.code = 'PR')
    OR (h.description LIKE '%Piauí%' AND l.code = 'PI')
    OR (h.description LIKE '%Rio de Janeiro%' AND l.code = 'RJ')
    OR (h.description LIKE '%Rio Grande do Norte%' AND l.code = 'RN')
    OR (h.description LIKE '%Rio Grande do Sul%' AND l.code = 'RS')
    OR (h.description LIKE '%Rondônia%' AND l.code = 'RO')
    OR (h.description LIKE '%Roraima%' AND l.code = 'RR')
    OR (h.description LIKE '%Santa Catarina%' AND l.code = 'SC')
    OR (h.description LIKE '%São Paulo%' AND l.code = 'SP')
    OR (h.description LIKE '%Tocantins%' AND l.code = 'TO')
  )
ON CONFLICT DO NOTHING;
