-- Seed: Brazilian national, optional and state holidays for 2026.
--
-- Municipal 2026 coverage is loaded by 21-seed-municipal-anniversaries-full.sql.
-- Movable dates use Easter Sunday 2026-04-05:
-- Carnaval 2026-02-16/17, Ash Wednesday 2026-02-18, Good Friday 2026-04-03,
-- Nossa Senhora da Penha 2026-04-13, Corpus Christi 2026-06-04.

WITH source (name, date, type, description, is_fixed, location_code) AS (
VALUES
  ('Confraternização Universal', DATE '2026-01-01', 'national', 'Ano Novo', true, 'BR'),
  ('Paixão de Cristo', DATE '2026-04-03', 'national', 'Sexta-feira Santa', false, 'BR'),
  ('Tiradentes', DATE '2026-04-21', 'national', 'Dia de Tiradentes', true, 'BR'),
  ('Dia do Trabalho', DATE '2026-05-01', 'national', 'Dia Mundial do Trabalho', true, 'BR'),
  ('Independência do Brasil', DATE '2026-09-07', 'national', 'Dia da Independência', true, 'BR'),
  ('Nossa Senhora Aparecida', DATE '2026-10-12', 'national', 'Padroeira do Brasil', true, 'BR'),
  ('Finados', DATE '2026-11-02', 'national', 'Dia de Finados', true, 'BR'),
  ('Proclamação da República', DATE '2026-11-15', 'national', 'Dia da Proclamação da República', true, 'BR'),
  ('Dia da Consciência Negra', DATE '2026-11-20', 'national', 'Dia Nacional de Zumbi e da Consciência Negra', true, 'BR'),
  ('Natal', DATE '2026-12-25', 'national', 'Nascimento de Jesus Cristo', true, 'BR'),

  ('Carnaval', DATE '2026-02-16', 'optional', 'Segunda-feira de Carnaval - Ponto Facultativo', false, 'BR'),
  ('Carnaval', DATE '2026-02-17', 'optional', 'Terça-feira de Carnaval - Ponto Facultativo', false, 'BR'),
  ('Quarta-feira de Cinzas', DATE '2026-02-18', 'optional', 'Ponto Facultativo até 14h', false, 'BR'),
  ('Ponto Facultativo Nacional', DATE '2026-04-20', 'optional', 'Ponto Facultativo antes de Tiradentes', false, 'BR'),
  ('Corpus Christi', DATE '2026-06-04', 'optional', 'Ponto Facultativo', false, 'BR'),
  ('Sexta-feira após Corpus Christi', DATE '2026-06-05', 'optional', 'Ponto Facultativo', false, 'BR'),
  ('Dia do Servidor Público', DATE '2026-10-28', 'optional', 'Ponto Facultativo', true, 'BR'),
  ('Véspera de Natal', DATE '2026-12-24', 'optional', 'Ponto Facultativo após 13h', true, 'BR'),
  ('Véspera de Ano Novo', DATE '2026-12-31', 'optional', 'Ponto Facultativo após 13h', true, 'BR'),

  ('Criação do estado', DATE '2026-01-04', 'state', 'Feriado estadual de Rondônia', true, 'RO'),
  ('Dia do Católico', DATE '2026-01-20', 'state', 'Santo Sebastião - Feriado estadual do Acre', true, 'AC'),
  ('Dia do Evangélico', DATE '2026-01-23', 'state', 'Feriado estadual do Acre', true, 'AC'),
  ('Carnaval', DATE '2026-02-16', 'state', 'Feriado estadual do Rio de Janeiro', false, 'RJ'),
  ('Carnaval', DATE '2026-02-17', 'state', 'Feriado estadual do Rio de Janeiro', false, 'RJ'),
  ('Data Magna de Pernambuco', DATE '2026-03-06', 'state', 'Revolução Pernambucana de 1817', true, 'PE'),
  ('Dia da Batalha do Jenipapo', DATE '2026-03-13', 'state', 'Feriado estadual do Piauí', true, 'PI'),
  ('Autonomia do Estado', DATE '2026-03-18', 'state', 'Instalação de Tocantins', true, 'TO'),
  ('Dia de São José', DATE '2026-03-19', 'state', 'Padroeiro do Amapá - Feriado estadual', true, 'AP'),
  ('São José', DATE '2026-03-19', 'state', 'Feriado estadual do Ceará e padroeiro de Fortaleza', true, 'CE'),
  ('Abolição da escravidão no Ceará', DATE '2026-03-25', 'state', 'Feriado estadual do Ceará', true, 'CE'),
  ('Nossa Senhora da Penha', DATE '2026-04-13', 'state', 'Data Magna do Espírito Santo - Padroeira do Estado', false, 'ES'),
  ('Fundação de Brasília', DATE '2026-04-21', 'state', 'Aniversário de Brasília', true, 'DF'),
  ('Tiradentes', DATE '2026-04-21', 'state', 'Dia de Tiradentes (feriado nacional e especial para MG)', true, 'MG'),
  ('Dia de São Jorge', DATE '2026-04-23', 'state', 'Padroeiro do Rio de Janeiro', true, 'RJ'),
  ('Aniversário do Acre', DATE '2026-06-15', 'state', 'Data magna do Estado do Acre', true, 'AC'),
  ('Dia do Evangélico', DATE '2026-06-18', 'state', 'Feriado estadual de Rondônia', true, 'RO'),
  ('São João', DATE '2026-06-24', 'state', 'Feriado estadual de Alagoas', true, 'AL'),
  ('São João', DATE '2026-06-24', 'state', 'Feriado estadual de Pernambuco', true, 'PE'),
  ('São Pedro', DATE '2026-06-29', 'state', 'Feriado estadual de Alagoas', true, 'AL'),
  ('Independência da Bahia', DATE '2026-07-02', 'state', 'Feriado estadual da Bahia', true, 'BA'),
  ('Emancipação Política de Sergipe', DATE '2026-07-08', 'state', 'Data Magna de Sergipe', true, 'SE'),
  ('Revolução Constitucionalista de 1932', DATE '2026-07-09', 'state', 'Feriado estadual de São Paulo', true, 'SP'),
  ('São Tiago', DATE '2026-07-25', 'state', 'Feriado estadual do Amapá', true, 'AP'),
  ('Adesão do Maranhão à Independência do Brasil', DATE '2026-07-28', 'state', 'Feriado estadual do Maranhão', true, 'MA'),
  ('Fundação do Estado', DATE '2026-08-05', 'state', 'Feriado estadual da Paraíba - Nossa Senhora das Neves', true, 'PB'),
  ('Início da Revolução Acreana', DATE '2026-08-06', 'state', 'Feriado estadual do Acre', true, 'AC'),
  ('Criação da capitania', DATE '2026-08-11', 'state', 'Catarina de Alexandria - Padroeira do estado', true, 'SC'),
  ('Adesão do Grão-Pará à Independência do Brasil', DATE '2026-08-15', 'state', 'Feriado estadual do Pará', true, 'PA'),
  ('Dia da Amazônia', DATE '2026-09-05', 'state', 'Feriado estadual do Acre', true, 'AC'),
  ('Elevação do Amazonas à categoria de província', DATE '2026-09-05', 'state', 'Feriado estadual do Amazonas', true, 'AM'),
  ('Nossa Senhora da Natividade', DATE '2026-09-08', 'state', 'Padroeira do Tocantins', true, 'TO'),
  ('Emancipação Política de Alagoas', DATE '2026-09-16', 'state', 'Feriado estadual de Alagoas', true, 'AL'),
  ('Revolução Farroupilha', DATE '2026-09-20', 'state', 'Feriado estadual do Rio Grande do Sul', true, 'RS'),
  ('Mártires de Cunhaú e Uruaçu', DATE '2026-10-03', 'state', 'Feriado estadual do Rio Grande do Norte', true, 'RN'),
  ('Criação do estado', DATE '2026-10-05', 'state', 'Feriado estadual de Roraima', true, 'RR'),
  ('Criação do estado', DATE '2026-10-05', 'state', 'Criação do estado do Tocantins', true, 'TO'),
  ('Criação do estado', DATE '2026-10-11', 'state', 'Feriado estadual do Mato Grosso do Sul', true, 'MS'),
  ('Dia do Piauí', DATE '2026-10-19', 'state', 'Aniversário do estado', true, 'PI'),
  ('Dia do Comerciário', DATE '2026-10-20', 'state', 'Feriado estadual do Rio de Janeiro', true, 'RJ'),
  ('Assinatura do Tratado de Petrópolis', DATE '2026-11-17', 'state', 'Feriado estadual do Acre', true, 'AC'),
  ('Dia do Evangélico', DATE '2026-11-30', 'state', 'Feriado estadual de Alagoas', true, 'AL'),
  ('Dia do Evangélico', DATE '2026-11-30', 'state', 'Feriado distrital', true, 'DF'),
  ('Nossa Senhora da Conceição', DATE '2026-12-08', 'state', 'Padroeira do Amazonas - Feriado estadual', true, 'AM'),
  ('Emancipação do Paraná', DATE '2026-12-19', 'state', 'Feriado estadual do Paraná', true, 'PR')
),
inserted_holidays AS (
  INSERT INTO holidays (name, date, year, type, description, is_fixed)
  SELECT s.name, s.date, 2026, s.type, s.description, s.is_fixed
  FROM source s
  WHERE NOT EXISTS (
    SELECT 1
    FROM holidays h
    WHERE h.name = s.name
      AND h.date = s.date
      AND h.year = 2026
      AND h.type = s.type
      AND COALESCE(h.description, '') = COALESCE(s.description, '')
  )
  RETURNING id, name, date, year, type, description
),
target_holidays AS (
  SELECT id, name, date, year, type, description
  FROM inserted_holidays

  UNION ALL

  SELECT h.id, h.name, h.date, h.year, h.type, h.description
  FROM source s
  JOIN holidays h
    ON h.name = s.name
   AND h.date = s.date
   AND h.year = 2026
   AND h.type = s.type
   AND COALESCE(h.description, '') = COALESCE(s.description, '')
)
INSERT INTO holiday_locations (holiday_id, location_id)
SELECT h.id, l.id
FROM source s
JOIN target_holidays h
  ON h.name = s.name
 AND h.date = s.date
 AND h.year = 2026
 AND h.type = s.type
 AND COALESCE(h.description, '') = COALESCE(s.description, '')
JOIN locations l ON l.code = s.location_code
WHERE NOT EXISTS (
  SELECT 1
  FROM holiday_locations hl
  WHERE hl.holiday_id = h.id
    AND hl.location_id = l.id
);
