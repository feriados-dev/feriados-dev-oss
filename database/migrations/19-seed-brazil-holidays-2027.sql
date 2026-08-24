-- Seed: Brazilian holidays for 2027
--
-- Scope mirrors the 2026 coverage currently exposed by v1:
-- national holidays, national optional dates, state holidays and covered capital/municipal holidays.
-- Movable dates are projected from Easter Sunday 2027-03-28:
-- Carnaval 2027-02-08/09, Ash Wednesday 2027-02-10, Good Friday 2027-03-26,
-- Nossa Senhora da Penha 2027-04-05, Corpus Christi 2027-05-27.
-- Círio de Nazaré is the second Sunday of October: 2027-10-10.
--
-- The 2026 "Ponto Facultativo Nacional" on 2026-04-20 was a non-recurring bridge
-- before Tiradentes and is intentionally not projected because Tiradentes falls on
-- Wednesday in 2027.

WITH source (name, date, type, description, is_fixed, location_code) AS (
VALUES
  ('Aniversário de Belém', DATE '2027-01-12', 'municipal', 'Fundação de Belém do Pará', true, 'PA-belem'),
  ('São Sebastião', DATE '2027-01-20', 'municipal', 'Padroeiro do Rio de Janeiro', true, 'RJ-rio-de-janeiro'),
  ('Aniversário de São Paulo', DATE '2027-01-25', 'municipal', 'Fundação de São Paulo', true, 'SP-sao-paulo'),
  ('Nossa Senhora dos Navegantes', DATE '2027-02-02', 'municipal', 'Padroeira de Porto Alegre', true, 'RS-porto-alegre'),
  ('Aniversário de Macapá', DATE '2027-02-04', 'municipal', 'Fundação de Macapá', true, 'AP-macapa'),
  ('Aniversário do Rio de Janeiro', DATE '2027-03-01', 'municipal', 'Fundação da cidade do Rio de Janeiro', true, 'RJ-rio-de-janeiro'),
  ('Aniversário do Recife', DATE '2027-03-12', 'municipal', 'Fundação de Recife', true, 'PE-recife'),
  ('Aniversário de Aracaju', DATE '2027-03-17', 'municipal', 'Fundação de Aracaju', true, 'SE-aracaju'),
  ('Aniversário de Florianópolis', DATE '2027-03-23', 'municipal', 'Emancipação de Florianópolis', true, 'SC-florianopolis'),
  ('Aniversário de Porto Alegre', DATE '2027-03-26', 'municipal', 'Fundação de Porto Alegre', true, 'RS-porto-alegre'),
  ('Aniversário de Curitiba', DATE '2027-03-29', 'municipal', 'Fundação de Curitiba', true, 'PR-curitiba'),
  ('Aniversário de Salvador', DATE '2027-03-29', 'municipal', 'Fundação de Salvador', true, 'BA-salvador'),
  ('Nossa Senhora da Penha', DATE '2027-04-05', 'municipal', 'Padroeira do ES e de Vitória - Feriado municipal', false, 'ES-vitoria'),
  ('Aniversário de Cuiabá', DATE '2027-04-08', 'municipal', 'Fundação de Cuiabá', true, 'MT-cuiaba'),
  ('Aniversário de Fortaleza', DATE '2027-04-13', 'municipal', 'Fundação de Fortaleza', true, 'CE-fortaleza'),
  ('Fundação de Brasília', DATE '2027-04-21', 'municipal', 'Aniversário de Brasília', true, 'DF-brasilia'),
  ('São Jorge', DATE '2027-04-23', 'municipal', 'Padroeiro do Rio de Janeiro', true, 'RJ-rio-de-janeiro'),
  ('Corpus Christi', DATE '2027-05-27', 'municipal', 'Feriado municipal de Florianópolis', false, 'SC-florianopolis'),
  ('Corpus Christi', DATE '2027-05-27', 'municipal', 'Feriado municipal de São Paulo', false, 'SP-sao-paulo'),
  ('São João', DATE '2027-06-24', 'municipal', 'Feriado municipal de Recife', true, 'PE-recife'),
  ('Nossa Senhora do Carmo', DATE '2027-07-16', 'municipal', 'Padroeira de Recife', true, 'PE-recife'),
  ('Aniversário de João Pessoa', DATE '2027-08-05', 'municipal', 'Fundação de João Pessoa - Nossa Senhora das Neves', true, 'PB-joao-pessoa'),
  ('Nossa Senhora da Assunção', DATE '2027-08-15', 'municipal', 'Padroeira de Fortaleza', true, 'CE-fortaleza'),
  ('Aniversário de Teresina', DATE '2027-08-16', 'municipal', 'Fundação de Teresina', true, 'PI-teresina'),
  ('Aniversário de Campo Grande', DATE '2027-08-26', 'municipal', 'Fundação de Campo Grande', true, 'MS-campo-grande'),
  ('Aniversário de São Luís', DATE '2027-09-08', 'municipal', 'Fundação de São Luís', true, 'MA-sao-luis'),
  ('Aniversário de Vitória', DATE '2027-09-08', 'municipal', 'Fundação de Vitória', true, 'ES-vitoria'),
  ('Nossa Senhora da Luz dos Pinhais', DATE '2027-09-08', 'municipal', 'Padroeira de Curitiba', true, 'PR-curitiba'),
  ('Aniversário de Boa Vista', DATE '2027-09-09', 'municipal', 'Fundação de Boa Vista', true, 'RR-boa-vista'),
  ('Aniversário de Porto Velho', DATE '2027-10-02', 'municipal', 'Fundação de Porto Velho', true, 'RO-porto-velho'),
  ('Círio de Nazaré', DATE '2027-10-10', 'municipal', 'Segundo domingo de outubro - Belém do Pará', false, 'PA-belem'),
  ('Aniversário de Goiânia', DATE '2027-10-24', 'municipal', 'Fundação de Goiânia', true, 'GO-goiania'),
  ('Aniversário de Manaus', DATE '2027-10-24', 'municipal', 'Fundação de Manaus', true, 'AM-manaus'),
  ('Consciência Negra', DATE '2027-11-20', 'municipal', 'Feriado municipal do Rio de Janeiro', true, 'RJ-rio-de-janeiro'),
  ('Consciência Negra', DATE '2027-11-20', 'municipal', 'Feriado municipal de São Paulo', true, 'SP-sao-paulo'),
  ('Nossa Senhora da Apresentação', DATE '2027-11-21', 'municipal', 'Padroeira de Natal', true, 'RN-natal'),
  ('Aniversário de Maceió', DATE '2027-12-05', 'municipal', 'Fundação de Maceió', true, 'AL-maceio'),
  ('Nossa Senhora da Conceição', DATE '2027-12-08', 'municipal', 'Padroeira de Manaus - Feriado municipal', true, 'AM-manaus'),
  ('Nossa Senhora da Conceição', DATE '2027-12-08', 'municipal', 'Padroeira de Cuiabá - Feriado municipal', true, 'MT-cuiaba'),
  ('Nossa Senhora da Conceição', DATE '2027-12-08', 'municipal', 'Padroeira de Teresina - Feriado municipal', true, 'PI-teresina'),
  ('Nossa Senhora da Conceição', DATE '2027-12-08', 'municipal', 'Padroeira de Boa Vista - Feriado municipal', true, 'RR-boa-vista'),
  ('Nossa Senhora da Conceição da Praia', DATE '2027-12-08', 'municipal', 'Padroeira de Salvador', true, 'BA-salvador'),
  ('Aniversário de Londrina', DATE '2027-12-10', 'municipal', 'Fundação de Londrina', true, 'PR-londrina'),
  ('Aniversário de Belo Horizonte', DATE '2027-12-12', 'municipal', 'Fundação de Belo Horizonte', true, 'MG-belo-horizonte'),
  ('Aniversário de Natal', DATE '2027-12-25', 'municipal', 'Fundação de Natal (coincide com Natal nacional)', true, 'RN-natal'),
  ('Aniversário de Rio Branco', DATE '2027-12-28', 'municipal', 'Fundação de Rio Branco', true, 'AC-rio-branco'),

  ('Confraternização Universal', DATE '2027-01-01', 'national', 'Ano Novo', true, 'BR'),
  ('Paixão de Cristo', DATE '2027-03-26', 'national', 'Sexta-feira Santa', false, 'BR'),
  ('Tiradentes', DATE '2027-04-21', 'national', 'Dia de Tiradentes', true, 'BR'),
  ('Dia do Trabalho', DATE '2027-05-01', 'national', 'Dia Mundial do Trabalho', true, 'BR'),
  ('Independência do Brasil', DATE '2027-09-07', 'national', 'Dia da Independência', true, 'BR'),
  ('Nossa Senhora Aparecida', DATE '2027-10-12', 'national', 'Padroeira do Brasil', true, 'BR'),
  ('Finados', DATE '2027-11-02', 'national', 'Dia de Finados', true, 'BR'),
  ('Proclamação da República', DATE '2027-11-15', 'national', 'Dia da Proclamação da República', true, 'BR'),
  ('Dia da Consciência Negra', DATE '2027-11-20', 'national', 'Dia Nacional de Zumbi e da Consciência Negra', true, 'BR'),
  ('Natal', DATE '2027-12-25', 'national', 'Nascimento de Jesus Cristo', true, 'BR'),

  ('Carnaval', DATE '2027-02-08', 'optional', 'Segunda-feira de Carnaval - Ponto Facultativo', false, 'BR'),
  ('Carnaval', DATE '2027-02-09', 'optional', 'Terça-feira de Carnaval - Ponto Facultativo', false, 'BR'),
  ('Quarta-feira de Cinzas', DATE '2027-02-10', 'optional', 'Ponto Facultativo até 14h', false, 'BR'),
  ('Corpus Christi', DATE '2027-05-27', 'optional', 'Ponto Facultativo', false, 'BR'),
  ('Sexta-feira após Corpus Christi', DATE '2027-05-28', 'optional', 'Ponto Facultativo', false, 'BR'),
  ('Dia do Servidor Público', DATE '2027-10-28', 'optional', 'Ponto Facultativo', true, 'BR'),
  ('Véspera de Natal', DATE '2027-12-24', 'optional', 'Ponto Facultativo após 13h', true, 'BR'),
  ('Véspera de Ano Novo', DATE '2027-12-31', 'optional', 'Ponto Facultativo após 13h', true, 'BR'),

  ('Criação do estado', DATE '2027-01-04', 'state', 'Feriado estadual de Rondônia', true, 'RO'),
  ('Dia do Católico', DATE '2027-01-20', 'state', 'Santo Sebastião - Feriado estadual do Acre', true, 'AC'),
  ('Dia do Evangélico', DATE '2027-01-23', 'state', 'Feriado estadual do Acre', true, 'AC'),
  ('Carnaval', DATE '2027-02-08', 'state', 'Feriado estadual do Rio de Janeiro', false, 'RJ'),
  ('Carnaval', DATE '2027-02-09', 'state', 'Feriado estadual do Rio de Janeiro', false, 'RJ'),
  ('Data Magna de Pernambuco', DATE '2027-03-06', 'state', 'Revolução Pernambucana de 1817', true, 'PE'),
  ('Dia da Batalha do Jenipapo', DATE '2027-03-13', 'state', 'Feriado estadual do Piauí', true, 'PI'),
  ('Autonomia do Estado', DATE '2027-03-18', 'state', 'Instalação de Tocantins', true, 'TO'),
  ('Dia de São José', DATE '2027-03-19', 'state', 'Padroeiro do Amapá - Feriado estadual', true, 'AP'),
  ('São José', DATE '2027-03-19', 'state', 'Feriado estadual do Ceará e padroeiro de Fortaleza', true, 'CE'),
  ('Abolição da escravidão no Ceará', DATE '2027-03-25', 'state', 'Feriado estadual do Ceará', true, 'CE'),
  ('Nossa Senhora da Penha', DATE '2027-04-05', 'state', 'Data Magna do Espírito Santo - Padroeira do Estado', false, 'ES'),
  ('Fundação de Brasília', DATE '2027-04-21', 'state', 'Aniversário de Brasília', true, 'DF'),
  ('Tiradentes', DATE '2027-04-21', 'state', 'Dia de Tiradentes (feriado nacional e especial para MG)', true, 'MG'),
  ('Dia de São Jorge', DATE '2027-04-23', 'state', 'Padroeiro do Rio de Janeiro', true, 'RJ'),
  ('Aniversário do Acre', DATE '2027-06-15', 'state', 'Data magna do Estado do Acre', true, 'AC'),
  ('Dia do Evangélico', DATE '2027-06-18', 'state', 'Feriado estadual de Rondônia', true, 'RO'),
  ('São João', DATE '2027-06-24', 'state', 'Feriado estadual de Alagoas', true, 'AL'),
  ('São João', DATE '2027-06-24', 'state', 'Feriado estadual de Pernambuco', true, 'PE'),
  ('São Pedro', DATE '2027-06-29', 'state', 'Feriado estadual de Alagoas', true, 'AL'),
  ('Independência da Bahia', DATE '2027-07-02', 'state', 'Feriado estadual da Bahia', true, 'BA'),
  ('Emancipação Política de Sergipe', DATE '2027-07-08', 'state', 'Data Magna de Sergipe', true, 'SE'),
  ('Revolução Constitucionalista de 1932', DATE '2027-07-09', 'state', 'Feriado estadual de São Paulo', true, 'SP'),
  ('São Tiago', DATE '2027-07-25', 'state', 'Feriado estadual do Amapá', true, 'AP'),
  ('Adesão do Maranhão à Independência do Brasil', DATE '2027-07-28', 'state', 'Feriado estadual do Maranhão', true, 'MA'),
  ('Fundação do Estado', DATE '2027-08-05', 'state', 'Feriado estadual da Paraíba - Nossa Senhora das Neves', true, 'PB'),
  ('Início da Revolução Acreana', DATE '2027-08-06', 'state', 'Feriado estadual do Acre', true, 'AC'),
  ('Criação da capitania', DATE '2027-08-11', 'state', 'Catarina de Alexandria - Padroeira do estado', true, 'SC'),
  ('Adesão do Grão-Pará à Independência do Brasil', DATE '2027-08-15', 'state', 'Feriado estadual do Pará', true, 'PA'),
  ('Dia da Amazônia', DATE '2027-09-05', 'state', 'Feriado estadual do Acre', true, 'AC'),
  ('Elevação do Amazonas à categoria de província', DATE '2027-09-05', 'state', 'Feriado estadual do Amazonas', true, 'AM'),
  ('Nossa Senhora da Natividade', DATE '2027-09-08', 'state', 'Padroeira do Tocantins', true, 'TO'),
  ('Emancipação Política de Alagoas', DATE '2027-09-16', 'state', 'Feriado estadual de Alagoas', true, 'AL'),
  ('Revolução Farroupilha', DATE '2027-09-20', 'state', 'Feriado estadual do Rio Grande do Sul', true, 'RS'),
  ('Mártires de Cunhaú e Uruaçu', DATE '2027-10-03', 'state', 'Feriado estadual do Rio Grande do Norte', true, 'RN'),
  ('Criação do estado', DATE '2027-10-05', 'state', 'Feriado estadual de Roraima', true, 'RR'),
  ('Criação do estado', DATE '2027-10-05', 'state', 'Criação do estado do Tocantins', true, 'TO'),
  ('Criação do estado', DATE '2027-10-11', 'state', 'Feriado estadual do Mato Grosso do Sul', true, 'MS'),
  ('Dia do Piauí', DATE '2027-10-19', 'state', 'Aniversário do estado', true, 'PI'),
  ('Dia do Comerciário', DATE '2027-10-20', 'state', 'Feriado estadual do Rio de Janeiro', true, 'RJ'),
  ('Assinatura do Tratado de Petrópolis', DATE '2027-11-17', 'state', 'Feriado estadual do Acre', true, 'AC'),
  ('Dia do Evangélico', DATE '2027-11-30', 'state', 'Feriado estadual de Alagoas', true, 'AL'),
  ('Dia do Evangélico', DATE '2027-11-30', 'state', 'Feriado distrital', true, 'DF'),
  ('Nossa Senhora da Conceição', DATE '2027-12-08', 'state', 'Padroeira do Amazonas - Feriado estadual', true, 'AM'),
  ('Emancipação do Paraná', DATE '2027-12-19', 'state', 'Feriado estadual do Paraná', true, 'PR')
),
inserted_holidays AS (
  INSERT INTO holidays (name, date, year, type, description, is_fixed)
  SELECT s.name, s.date, 2027, s.type, s.description, s.is_fixed
  FROM source s
  WHERE NOT EXISTS (
    SELECT 1
    FROM holidays h
    WHERE h.name = s.name
      AND h.date = s.date
      AND h.year = 2027
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
   AND h.year = 2027
   AND h.type = s.type
   AND COALESCE(h.description, '') = COALESCE(s.description, '')
)
INSERT INTO holiday_locations (holiday_id, location_id)
SELECT h.id, l.id
FROM source s
JOIN target_holidays h
  ON h.name = s.name
 AND h.date = s.date
 AND h.year = 2027
 AND h.type = s.type
 AND COALESCE(h.description, '') = COALESCE(s.description, '')
JOIN locations l ON l.code = s.location_code
WHERE NOT EXISTS (
  SELECT 1
  FROM holiday_locations hl
  WHERE hl.holiday_id = h.id
    AND hl.location_id = l.id
);
