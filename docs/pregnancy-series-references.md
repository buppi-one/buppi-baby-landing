# Reference pool — "Pregnancy week by week" series

Compiled 2026-11-21. Every row marked VERIFIED was opened in this session and its title checked.
Line format: `fact | source + document + year | URL | status`.

How each source was opened (matters for re-checking):

- **curl, direct**: NHS, WHO, gov.br, bvsms, planalto, FEBRASGO, RCOG, gov.uk, sanidad.gob.es, SEGO library, Santé publique France, service-public.gouv.fr.
- **PubMed**: pubmed.ncbi.nlm.nih.gov HTML returns a bot page to curl, so every PMID was confirmed through the official NCBI E-utilities API (esummary/efetch) — title, journal, year read from the record. Three PMIDs I would have written from memory were wrong; only API-confirmed ones are listed.
- **Browser (Chrome)**: ACOG (all pages) and Légifrance — both sit behind an automatic Cloudflare check that curl/WebFetch cannot pass.
- **WebFetch**: CDC (curl gets 403).
- **Blocked from this network (NOT VERIFIED)**: nice.org.uk (403 even in browser), ameli.fr (human-verification checkbox, not bypassed), has-sante.fr (403), vaccination-info-service.fr (403), sante.gouv.fr vaccine calendar PDF (security challenge), web.archive.org (unreachable).

Series rule applied to these notes: no medication names or doses. Vaccines are named by disease. Where a source recommends a drug/supplement it is written generically.

Week-counting note: all four countries count from the first day of the last menstrual period. France calls this "semaines d'aménorrhée (SA)" = gestational weeks used everywhere else. French sources ALSO use "mois de grossesse" and "semaines de grossesse" (= SA minus 2) — never convert by eye.

---

## Part A — Brazil (backbone)

### A1. Visits

- Start prenatal care as early as possible, preferably by week 12; minimum of **7 consultations**, alternating doctor/nurse, plus at least 1 dental consultation; no "discharge" from prenatal care | Ministério da Saúde, Caderneta Brasileira da Gestante, 1ª ed. 2026 (ISBN 978-85-334-2907-9), seção 4.1 | https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/publicacoes/caderneta-brasileira-da-gestante.pdf | VERIFIED
- Minimum schedule: monthly up to 28 wk; every two weeks from 28 to 36 wk; weekly from 36 wk; at least 2 postpartum consultations (first week after discharge and around day 30) | same Caderneta 2026, 4.1.4 | same URL | VERIFIED
- Same frequency on the Ministry web page (monthly to 28 wk, fortnightly 28–36, weekly at term; start preferably by week 12) | Ministério da Saúde, "Pré-natal" (Saúde de A a Z) | https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/g/gravidez/pre-natal | VERIFIED
- Rede Alyne ordinance: prenatal component = early enrolment (by 12 wk) and **at least seven** consultations alternating nurse/doctor | Portaria GM/MS nº 5.350, 12 Sep 2024 (institui a Rede Alyne) | https://bvsms.saude.gov.br/bvs/saudelegis/gm/2024/prt5350_13_09_2024.html | VERIFIED
- OLDER number, do not mix: CAB 32 (2012) says minimum of **6** consultations (same monthly/fortnightly/weekly rhythm). The 2024 ordinance and the 2026 Caderneta say 7 — use 7 | Ministério da Saúde, Cadernos de Atenção Básica nº 32, Atenção ao pré-natal de baixo risco, 2012 | https://bvsms.saude.gov.br/bvs/publicacoes/cadernos_atencao_basica_32_prenatal.pdf | VERIFIED
- If birth has not happened by 41 wk, refer for fetal wellbeing assessment; CAB 32 states induction at 41 wk is preferable to serial monitoring | CAB 32, 2012 | same CAB 32 URL | VERIFIED
- FEBRASGO lay guidance: at least six consultations; ideally monthly until the 7th month, then fortnightly, weekly after the 8th month; minimum two ultrasounds (one early in 1st trimester, one between 20 and 24 wk) | FEBRASGO, "Dia da Gestante: Febrasgo orienta sobre cuidados à saúde da mulher na gestação" (news item, date not captured) | https://www.febrasgo.org.br/noticia/dia-da-gestante-febrasgo-orienta-sobre-cuidados-a-saude-da-mulher-na-gestacao/ | VERIFIED (news page, not a guideline)

### A2. Routine exams by trimester (Caderneta 2026, table 4.2.1)

- 1st trimester / first visit: pregnancy rapid test; hemograma; blood type ABO/Rh (indirect Coombs if Rh negative); hemoglobin electrophoresis; fasting glucose (or oral glucose tolerance test if already past 24 wk); syphilis, HIV, hepatitis B and hepatitis C tests; toxoplasmosis serology (IgG/IgM); HTLV test; urine type I and urine culture; Chagas and malaria tests only in suspected/endemic settings; obstetric ultrasound "ideally between 7 and 12 weeks" | Caderneta Brasileira da Gestante 2026 | https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/publicacoes/caderneta-brasileira-da-gestante.pdf | VERIFIED
- 2nd trimester: oral glucose tolerance test preferably between 24 and 28 wk; indirect Coombs (Rh negative with previous negative result); toxoplasmosis repeat if susceptible; malaria in endemic regions | same | same URL | VERIFIED
- 3rd trimester: hemograma; fasting glucose; indirect Coombs (Rh negative); syphilis and HIV tests repeated; toxoplasmosis repeat if susceptible; urine type I and urine culture | same | same URL | VERIFIED
- At birth/immediately after: HIV and syphilis rapid tests; hepatitis B and C if not done in prenatal care | same | same URL | VERIFIED
- Gestational diabetes is usually symptomless and identified by a blood test done between weeks 24 and 28 | Caderneta 2026, 4.4.2 | same URL | VERIFIED
- CAB 32 (2012) exam table is similar but older (e.g. no HTLV/hepatitis C routine; glucose tolerance test only if glucose above a threshold or risk factor). Prefer the 2026 Caderneta | CAB 32, 2012 | https://bvsms.saude.gov.br/bvs/publicacoes/cadernos_atencao_basica_32_prenatal.pdf | VERIFIED

### A3. Ultrasounds — what SUS actually guarantees

- The 2026 Caderneta lists **one** routine obstetric ultrasound, ideally at 7–12 wk. Morphology scans are NOT in the routine table; Doppler ultrasound appears only under high-risk complementary exams | Caderneta 2026 | https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/publicacoes/caderneta-brasileira-da-gestante.pdf | VERIFIED
- CAB 32: ultrasound "can be offered when possible", ideally 10–13 wk for dating; routine ultrasound benefits uncertain, so not doing it "is not omission and does not lower prenatal quality" | CAB 32, 2012 | https://bvsms.saude.gov.br/bvs/publicacoes/cadernos_atencao_basica_32_prenatal.pdf | VERIFIED
- Lei 14.598/2023: public network shall include, "subject to budget availability" and regulation, fetal echocardiogram and at least 2 transvaginal ultrasounds in the first four months. Do NOT write this as a guaranteed entitlement | Lei nº 14.598, 14 Jun 2023 | https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14598.htm | VERIFIED
- FEBRASGO position on that law: scans are better timed at **11 to 13 wk + 6 d** (first-trimester) and **20 to 23 wk + 6 d** (second-trimester morphology, with cervical assessment); routine fetal echocardiography for everyone is not supported — reserve for risk factors (possible from 18 wk, best view 24–28 wk) | FEBRASGO, "Posicionamento FEBRASGO em relação à Lei 14.598…", 14 Jul 2023 | https://www.febrasgo.org.br/noticia/posicionamento-febrasgo-em-relacao-a-lei-14-598-sobre-inclusao-de-exames-no-protocolo-de-assistencia-de-rotina-as-gestantes-brasileiras/ | VERIFIED
- Rede Alyne funding: federal transfer per pregnant woman with prenatal exams assessed by 20 wk raised (covers rapid tests and ultrasound among others) — funding, not a per-woman guarantee of specific scans | Ministério da Saúde, news 25 Nov 2024 "Ministério da Saúde destina R$ 52 milhões para exames de pré-natal no SUS" | https://www.gov.br/saude/pt-br/assuntos/noticias/2024/novembro/ministerio-da-saude-destina-r-52-milhoes-para-exames-de-pre-natal-no-sus | VERIFIED
- International standard windows (use for "what the scan is", not for "what SUS gives"): 11–14 wk scan; routine mid-trimester scan (18–24 wk) | ISUOG Practice Guidelines (updated) 2023 and 2022, Ultrasound Obstet Gynecol | https://pubmed.ncbi.nlm.nih.gov/36594739/ and https://pubmed.ncbi.nlm.nih.gov/35592929/ | VERIFIED (titles/journals; week windows in titles only — abstracts carry no further numbers)
- "Second-trimester morphology 20–24 wk" as a Ministry/SUS rule | — | — | NOT VERIFIED (only FEBRASGO states a window; MS documents do not)

### A4. Vaccines in pregnancy (Brazil, current)

- At confirmation of pregnancy: hepatitis B (complete the 3-dose schedule if incomplete), dT (complete schedule), influenza (1 dose per season, any gestational age), covid-19 (1 dose each pregnancy); yellow fever only in exceptional situations after service evaluation | Ministério da Saúde, Calendário de Vacinação — aba Gestante (page fetched 2026-11-21) | https://www.gov.br/saude/pt-br/vacinacao/calendario | VERIFIED
- **dTpa (coqueluche): 1 dose from week 20, every pregnancy** | same calendar | same URL | VERIFIED
- **VSR (bronquiolite): 1 dose from week 28, every pregnancy** — incorporated in the national calendar | same calendar | same URL | VERIFIED
- Same content in the Caderneta 2026 vaccine table (dTpa from wk 20 each pregnancy; influenza any time, or up to 45 days postpartum if missed; covid-19 1 dose per pregnancy at least 6 months after last dose; VSR from wk 28, single dose each pregnancy; premature babies get protection in the maternity unit via an antibody product supplied by SUS) | Caderneta 2026, 4.3 | https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/publicacoes/caderneta-brasileira-da-gestante.pdf | VERIFIED
- VSR vaccine for pregnant women is available in SUS, single dose from week 28; protects the baby in the first six months | Ministério da Saúde, "Vírus Sincicial Respiratório" (Saúde de A a Z) | https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/v/vsr | VERIFIED
- Date nationwide VSR vaccination started (Dec 2025) and the incorporation ordinance number | search snippets only (agenciagov / SECTICS ordinance) | — | NOT VERIFIED (not opened)
- FEBRASGO statement on immunization across women's lives (exists; content not extracted) | da Silva AL et al., Rev Bras Ginecol Obstet 2024;46 | https://pubmed.ncbi.nlm.nih.gov/39530068/ | VERIFIED (record only)

### A5. Group B strep (GBS) in Brazil

- Ministry position: **no systematic GBS screening recommended**; "no consensus or technical recommendation in Brazil". CAB 32 mentions that 35–37 wk universal culture is the US (CDC) approach but concludes there is not enough evidence to recommend it | CAB 32, 2012, seção 6.3.20 and exam section | https://bvsms.saude.gov.br/bvs/publicacoes/cadernos_atencao_basica_32_prenatal.pdf | VERIFIED
- The 2026 Caderneta does not list a GBS swab among routine exams (only "vaginal secretion exam" under clinical indication) | Caderneta 2026 | https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/publicacoes/caderneta-brasileira-da-gestante.pdf | VERIFIED (absence checked by text search)
- A current FEBRASGO recommendation for universal 35–37 wk screening | — | — | NOT VERIFIED (no FEBRASGO guideline page found; only a COVID-era protocol in search snippets). Writers: say "muitos obstetras pedem, principalmente na rede privada; não faz parte da rotina do SUS" only if a source is added.

### A6. Fetal movements, term definitions, when to go

- Baby's movements become more noticeable around 20–24 wk; body movements visible on ultrasound from 14 wk | Caderneta 2026, 2.2 | https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/publicacoes/caderneta-brasileira-da-gestante.pdf | VERIFIED
- Warning sign: reduced or absent movements, especially **more than 4 hours without movement after 20 weeks** → seek care immediately | Caderneta 2026, 2.6 | same URL | VERIFIED
- CAB 32: mother usually perceives movements at 18–20 wk; daily movement record can start from week 34 in low-risk pregnancy; no standard counting method | CAB 32, 2012, 5.9.3 | https://bvsms.saude.gov.br/bvs/publicacoes/cadernos_atencao_basica_32_prenatal.pdf | VERIFIED
- Warning signs list (seek care immediately): blood pressure above usual / 140x90, vaginal bleeding, strong abdominal pain, fever, intense headache, visual changes, strong upper-stomach pain, pain on urination, sudden swelling of face/hands/legs, reduced movements, convulsions, fainting, shortness of breath, chest pain | Caderneta 2026, 2.6 and 4.4.1 | Caderneta URL | VERIFIED
- Trimesters in Brazil's Caderneta: 1st = 0–13 wk, 2nd = 14–27 wk, 3rd = from 28 wk; "37 to 42 weeks: baby ready to be born" | Caderneta 2026, 2.2.1 | Caderneta URL | VERIFIED
- Term categories (use these exact cut-offs): early term 37w0d–38w6d; full term 39w0d–40w6d; late term 41w0d–41w6d; post-term 42w0d and beyond | ACOG Committee Opinion No. 579, Definition of Term Pregnancy, 2013 (reaffirmed 2025) | https://pubmed.ncbi.nlm.nih.gov/24150030/ | VERIFIED
- Preterm = born alive before 37 completed weeks; extremely preterm <28 wk; very preterm 28 to <32; moderate to late preterm 32 to 37 | WHO fact sheet "Preterm birth" | https://www.who.int/news-room/fact-sheets/detail/preterm-birth | VERIFIED
- CAB 32 wording: "gestação prolongada/pós-datismo" = 40 to 42 wk; "pós-termo" = beyond 42 wk (older Brazilian wording; differs from ACOG's "late term" label) | CAB 32, 2012, 6.3.5 | CAB 32 URL | VERIFIED
- Signs labour is approaching: practice contractions (irregular, short ~20 s, long intervals), usually from 37 wk; mucus plug may come out; these are not active labour | Caderneta 2026, 5.1.2 | Caderneta URL | VERIFIED
- Latent phase (dilation up to 4 cm, irregular contractions about every 5–6 min) can be spent at home when possible; **active phase = time to go to the maternity/birth centre**: strong, regular contractions every 2–3 min lasting more than 30 s; if waters break, note the fluid colour and seek care; if in doubt about ruptured membranes, get assessed | Caderneta 2026, 5.2.2 | Caderneta URL | VERIFIED

### A7. Legal rights (gov sources only)

- Companion of the woman's choice during labour, birth and immediate postpartum in SUS services | Lei nº 11.108, 7 Apr 2005 | https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11108.htm | VERIFIED
- Extended in 2023: every woman may be accompanied by an adult in consultations, exams and procedures, in public and private health units | Lei nº 14.737, 27 Nov 2023 | https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14737.htm | VERIFIED
- Right to know and be linked, from enrolment in prenatal care, to the maternity where the birth will take place and where complications are handled (SUS) | Lei nº 11.634, 27 Dec 2007 | https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2007/lei/l11634.htm | VERIFIED
- Licença-maternidade 120 days; leave may start **between the 28th day before birth and the birth** (medical certificate) | CLT, art. 392 e §1º (Decreto-Lei 5.452) | https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm | VERIFIED
- Salário-maternidade paid for 120 days, starting between 28 days before birth and the date of birth | Lei nº 8.213/1991, art. 71 | https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm | VERIFIED
- Caderneta summary of work rights: maternity leave minimum 120 days (up to 180 in Empresa Cidadã companies); paternity leave minimum 5 days with gradual increase (10 days in 2027, 15 in 2028, 20 in 2029); job stability from confirmation of pregnancy until 5 months after birth; if mother or newborn stays hospitalised more than 14 days, leave is extended to 120 days after discharge; right to a doula (Lei 15.381/2026); school activities at home from the 8th month when needed | Caderneta 2026, Parte I (1.4–1.7) | https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/publicacoes/caderneta-brasileira-da-gestante.pdf | VERIFIED (the newer laws cited inside the Caderneta — 15.222/2025, 15.371/2026, 15.381/2026 — were NOT opened individually)
- INSS salário-maternidade service page (title confirmed; body is JavaScript-rendered, no facts extracted) | INSS, "Salário Maternidade" | https://www.gov.br/inss/pt-br/direitos-e-deveres/salario-maternidade | VERIFIED (title only)

---

## Part B — Other countries

### B1. England (NHS)

- First midwife ("booking") appointment at **8 to 12 weeks** (the NHS page now says 8–12, not 8–10); at least 10 appointments for a first baby, at least 7 if you have given birth before; 2 ultrasound scans | NHS, "Your antenatal care and appointments" (reviewed 17 Apr 2026) | https://www.nhs.uk/pregnancy/your-pregnancy-care/your-antenatal-care-and-appointments/ | VERIFIED
- Appointment weeks: 16; 25 (first baby); 28; 31 (first baby); 34; 36; 38; 40 (first baby); 41. Gestational diabetes test at 24–28 wk only for women at higher chance. At 28 wk: blood test and preventive injection offered when the baby is at risk of rhesus disease | same NHS page | same URL | VERIFIED
- Dating scan ("12-week scan") offered at around 10 to 14 weeks; combined screening happens at this scan if between 10 and 14 wk | NHS, "12-week scan" | https://www.nhs.uk/pregnancy/your-pregnancy-care/12-week-scan/ | VERIFIED
- 20-week screening scan usually between 18 and 21 weeks; can be done up to 23 wk in some cases | NHS, "20-week scan" | https://www.nhs.uk/pregnancy/your-pregnancy-care/20-week-scan/ | VERIFIED
- Programme windows: trisomy screening 10+0 to 14+1 (Down's up to 20+0); 20-week scan 18+0 to 20+6, completable up to 23+0 | NHS Fetal Anomaly Screening Programme overview (GOV.UK) | https://www.gov.uk/guidance/fetal-anomaly-screening-programme-overview | VERIFIED
- Whooping cough vaccine: usually at 20 wk, can be given **from 16 wk**; best before 32 wk; still possible later | NHS, "Whooping cough vaccination in pregnancy" | https://www.nhs.uk/pregnancy/keeping-well/whooping-cough-vaccination/ | VERIFIED
- RSV vaccine: offered **from 28 weeks**, in every pregnancy, around the 28-week appointment; can be given later, up to labour | NHS, "RSV vaccine" (reviewed 1 Sep 2024) | https://www.nhs.uk/vaccinations/rsv-vaccine/ | VERIFIED
- Flu vaccine recommended in pregnancy (any stage); overview of pregnancy vaccines | NHS, "Vaccinations in pregnancy" | https://www.nhs.uk/pregnancy/keeping-well/vaccinations/ | VERIFIED
- Group B strep is **not routinely tested for** in NHS pregnancy care | NHS, "Group B strep" | https://www.nhs.uk/conditions/group-b-strep/ | VERIFIED
- Gestational diabetes: glucose tolerance test at 24–28 wk for women with risk factors (earlier plus repeat if previous gestational diabetes) | NHS, "Gestational diabetes" | https://www.nhs.uk/conditions/gestational-diabetes/ | VERIFIED
- NICE NG201 Antenatal care (2021) full text | NICE | https://www.nice.org.uk/guidance/ng201 | NOT VERIFIED (403 from this network)
- NICE NG201 journal summary (record confirmed; no abstract) | Deshpande S et al., "Routine antenatal care for women and their babies: summary of NICE guidance", BMJ 2021;375:n2484 | https://pubmed.ncbi.nlm.nih.gov/34716150/ | VERIFIED (record only)

### B2. USA (ACOG / CDC)

- Whooping cough (Tdap) vaccine: every pregnancy, **27 to 36 weeks**, as early in the window as possible | CDC, "Vaccinating Pregnant Patients" (2 Dec 2025) | https://www.cdc.gov/pertussis/hcp/vaccine-recommendations/vaccinating-pregnant-patients.html | VERIFIED
- Same window, patient wording | ACOG FAQ, "The Tdap Vaccine and Pregnancy" (reviewed Apr 2026) | https://www.acog.org/womens-health/faqs/the-tdap-vaccine-and-pregnancy | VERIFIED
- Maternal RSV vaccine: one dose at **32 through 36 6/7 weeks**, seasonal (September through January in most of the continental US); not repeated in later pregnancies; after 36w6d the baby gets infant immunisation instead | CDC, "RSV Vaccine Guidance for Pregnant Women" (30 Aug 2024) | https://www.cdc.gov/rsv/hcp/vaccine-clinical-guidance/pregnant-people.html | VERIFIED
- ACOG patient FAQ gives 32–36 wk but states the season as "September 1 through March 1" — differs from the CDC page's September–January. Do not print season months; say "seasonal, check with your provider" | ACOG FAQ, "The RSV Vaccine and Pregnancy" | https://www.acog.org/womens-health/faqs/the-rsv-vaccine-and-pregnancy | VERIFIED
- ACIP recommendation paper for maternal RSV vaccine | Fleming-Dutra KE et al., MMWR 2023;72:1115-1122 | https://pubmed.ncbi.nlm.nih.gov/37824423/ | VERIFIED (record)
- GBS: universal screening at **36 0/7 to 37 6/7 weeks** (ACOG FAQ words it as "between 36 and 38 weeks"). Not "35–37" (that is the old US window, still used in Spain) | ACOG Committee Opinion No. 797, Obstet Gynecol 2020 | https://pubmed.ncbi.nlm.nih.gov/31977795/ | VERIFIED
- GBS patient page | ACOG FAQ, "Group B Strep and Pregnancy" (reviewed Apr 2025) | https://www.acog.org/womens-health/faqs/group-b-strep-and-pregnancy | VERIFIED
- CDC GBS prevention page says all pregnant women should be screened (no week stated on that page) | CDC, "Preventing Group B Strep Disease in Newborns" (1 May 2025) | https://www.cdc.gov/group-b-strep/prevention/index.html | VERIFIED
- Glucose screening at 24–28 wk (earlier if risk factors); GBS test listed at 36–38 wk | ACOG FAQ, "Routine Tests During Pregnancy" (reviewed Jan 2026) | https://www.acog.org/womens-health/faqs/routine-tests-during-pregnancy | VERIFIED
- US prenatal visit frequency | — | — | NOT VERIFIED (no ACOG page stating the schedule was opened)

### B3. Spain (Ministerio de Sanidad / SEGO)

- Ultrasounds (SEGO): three scans — **11+0 to 13+6**, **18+0 to 21+6**, **34+0 to 36+6** | SEGO, "Control prenatal del embarazo normal", protocolo actualizado mayo 2017 | https://bibliotecavirtual.sego.es/uploads/app/1297/elements/file/file1681394356.pdf | VERIFIED
- Ministry guideline (2014) differs: recommends **two** scans in low-risk pregnancy — end of first trimester (11–13+6) and around week 20 — and suggests NOT doing a routine third-trimester scan. Its annex table lists 12 wk (11–14), 20 wk (18–22), 32 wk (32–36). In practice most regions follow the three-scan SEGO scheme | Ministerio de Sanidad, Guía de práctica clínica de atención en el embarazo y puerperio, 2014 | https://www.sanidad.gob.es/organizacion/sns/planCalidadSNS/pdf/Guia_practica_AEP.pdf | VERIFIED
- "Ecografías 12/20/32-34" as stated in the brief | — | — | NOT VERIFIED as such: SEGO 2017 says third scan 34+0–36+6; the Ministry table says 32–36. Use the SEGO windows.
- Visits: Ministry guide suggests 6 to 9 visits in low-risk pregnancy; SEGO: 7 to 10 consultations; offer induction between 41+0 and 41+6 | Guía 2014 and SEGO 2017 | URLs above | VERIFIED
- Glucose screening (O'Sullivan test) for all pregnant women at 24–28 wk | SEGO 2017; Guía 2014 | URLs above | VERIFIED
- GBS: universal vaginal-rectal screening suggested at **35–37 weeks** | Guía de práctica clínica 2014 | https://www.sanidad.gob.es/organizacion/sns/planCalidadSNS/pdf/Guia_practica_AEP.pdf | VERIFIED
- Whooping cough vaccine (dTpa): one dose each pregnancy **from week 27, preferably week 27 or 28** | Ministerio de Sanidad, Calendario común de vacunación e inmunización a lo largo de toda la vida, calendario recomendado 2026 (aprobado CISNS 12 Dec 2025) | https://www.sanidad.gob.es/areas/promocionPrevencion/vacunaciones/calendario/docs/CalendarioVacunacion_Todalavida.pdf | VERIFIED
- Same, on the Ministry's pertussis-in-pregnancy page | Ministerio de Sanidad, "Tosferina" (vacunación en embarazadas) | https://www.sanidad.gob.es/areas/promocionPrevencion/vacunaciones/programasDeVacunacion/embarazadas/tosferina.htm | VERIFIED
- SEGO 2017 wording: dTpa between 27 and 36 weeks | SEGO 2017 | SEGO URL | VERIFIED
- Flu vaccine: 1 dose each season, any trimester (or postpartum up to 6 months if missed) | Calendario 2026 | calendar URL above | VERIFIED
- Covid-19 vaccine: pregnant women vaccinated each season, any trimester | Calendario 2026 (nota 12) | calendar URL above | VERIFIED
- RSV in Spain: the 2026 common calendar protects infants (0–6 months) with an antibody given to the baby before/during the season (babies born October–March get it in the first 24–48 h); a maternal RSV vaccine is NOT in the common calendar. Do not copy the Brazil/UK "from 28 weeks" message into es-ES | Calendario 2026 (nota 13, VRS) | calendar URL above | VERIFIED
- Vaccination-in-pregnancy chapter (older, 2018) | Ministerio de Sanidad, "Mujeres en edad fértil, embarazadas y puerperio" | https://www.sanidad.gob.es/areas/promocionPrevencion/vacunaciones/programasDeVacunacion/riesgo/docs/Mujeres_embarazadas_puerperio.pdf | VERIFIED
- LatAm note: es content also serves Latin America, where schedules differ by country — keep Spain-specific rules labelled "en España".

### B4. France (weeks are SA)

- **7 compulsory medical examinations**: the first before the end of the 3rd month of pregnancy, then one per month from the 4th month until birth; pregnancy declaration before end of 3rd month; a compulsory early prenatal interview ("entretien prénatal précoce") after declaration; pre-anaesthesia consultation in the 8th month (compulsory); birth-preparation sessions, mostly from the 7th month | Service-Public.fr (Premier ministre/DILA), "Grossesse : examens médicaux", vérifié le 16 mars 2026 | https://www.service-public.gouv.fr/particuliers/vosdroits/F963 | VERIFIED (official government site; not in the HAS/Ameli/SpF list — keep or drop by editorial choice)
- Three ultrasounds, one per trimester, as recommended by HAS: **11 to 13 SA + 6 d**; **20 to 24 SA + 6 d**; **30 to 34 SA + 6 d**, preferably mid-window (i.e. ~12, ~22, ~32 SA) | Arrêté du 20 avril 2018 (bonnes pratiques d'imagerie pour le diagnostic prénatal), Journal officiel — quotes the HAS recommendation | https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000036833452 | VERIFIED (browser only; official legal text, not in the named list)
- First-trimester screening between 11 and 13 SA; second-trimester morphology scan around 22 weeks; third-trimester scan for growth | Santé publique France, "La maladie" (anomalies congénitales) — English version read | https://www.santepubliquefrance.fr/en/anomalies-congenitales/disease (FR page: https://www.santepubliquefrance.fr/anomalies-congenitales/la-maladie, title confirmed) | VERIFIED
- Whooping cough vaccine: from the 2nd trimester, **preferably between 20 and 36 SA**, repeated every pregnancy | Santé publique France, "Vaccination des femmes enceintes — Repères pour votre pratique", novembre 2025 | https://www.santepubliquefrance.fr/sites/default/files/cadic_files/documents/spf00006413.pdf | VERIFIED
- RSV vaccine: **between 32 and 36 SA** (seasonal campaign); 2-week interval from the whooping cough vaccine | same SpF document | same URL | VERIFIED
- Flu vaccine at any stage of pregnancy; covid-19 vaccination remains recommended | same SpF document | same URL | VERIFIED
- HAS "Suivi et orientation des femmes enceintes…" page | HAS | https://www.has-sante.fr/jcms/c_547976/fr/suivi-et-orientation-des-femmes-enceintes-en-fonction-des-situations-a-risque-identifiees | NOT VERIFIED (403)
- Ameli pregnancy follow-up pages | Assurance Maladie | https://www.ameli.fr/assure/sante/devenir-parent/grossesse/grossesse-en-bonne-sante/grossesse/consultation-suivi-mensuel | NOT VERIFIED (human-verification wall)
- France: glucose screening week, GBS swab week | — | — | NOT VERIFIED (no reachable HAS/Ameli source)
- Calendrier des vaccinations 2025 (Ministère de la Santé) | — | https://sante.gouv.fr/IMG/pdf/pdf_calendrier_vaccinal-12-2025.pdf | NOT VERIFIED (security challenge)

---

## Part C — Topic references

- Fetal development by 4-week blocks (weeks 1–8 … 37–40); pregnancy ≈ 40 weeks from LMP (2 "extra" weeks counted before conception); trimesters: 1st to 13w6d, 2nd 14w0d–27w6d, 3rd 28w0d–40w6d; only about 1 in 20 births happen on the due date. Selected milestones: 9–12 wk eyelids/fingernails form, kidneys make urine; 13–16 hearing starts; 17–20 lanugo, features recognisable on ultrasound; 21–24 stronger kicks, sucking reflex; 25–28 eyelids open, lungs start making surfactant; 29–32 eyes sense light; 33–36 may turn head-down; 37–40 lungs/brain finishing | ACOG FAQ, "How Your Fetus Grows During Pregnancy" (updated Jan 2024, reviewed Mar 2026) | https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy | VERIFIED
- Term definitions (early/full/late/post-term) | ACOG Committee Opinion No. 579, 2013, reaffirmed 2025 | https://pubmed.ncbi.nlm.nih.gov/24150030/ ; ACOG page (redirected URL): https://www.acog.org/clinical/guidance/committee-opinion/2013/11/definition-of-term-pregnancy | VERIFIED
- Past the due date: 41–42 wk "late term", beyond 42 "postterm"; testing may be recommended at 41 wk; induction may be recommended at 41 wk | ACOG FAQ, "When Pregnancy Goes Past Your Due Date" (reviewed Mar 2026) | https://www.acog.org/womens-health/faqs/when-pregnancy-goes-past-your-due-date | VERIFIED
- Nausea and vomiting: usually starts before 9 wk; for most women gone by 14 wk; nausea starting for the first time after 9 wk needs evaluation; severe form occurs in up to 3% | ACOG FAQ, "Morning Sickness: Nausea and Vomiting of Pregnancy" (reviewed Nov 2025) | https://www.acog.org/womens-health/faqs/morning-sickness-nausea-and-vomiting-of-pregnancy | VERIFIED
- Same topic, clinical | ACOG Practice Bulletin No. 189, Obstet Gynecol 2018 | https://pubmed.ncbi.nlm.nih.gov/29266076/ | VERIFIED (record; contains drug content — do not relay)
- Exercise: at least 150 minutes of moderate aerobic activity per week; avoid contact sports and fall-risk activities | ACOG FAQ, "Exercise During Pregnancy" (updated Sep 2024) | https://www.acog.org/womens-health/faqs/exercise-during-pregnancy | VERIFIED
- Exercise, clinical | ACOG Committee Opinion No. 804, Obstet Gynecol 2020 | https://pubmed.ncbi.nlm.nih.gov/32217980/ | VERIFIED (record)
- Weight gain (US/IOM-based) | ACOG Committee Opinion No. 548, "Weight gain during pregnancy", 2013 | https://pubmed.ncbi.nlm.nih.gov/23262962/ ; ACOG page: https://www.acog.org/clinical/guidance/committee-opinion/2013/01/weight-gain-during-pregnancy | VERIFIED (title/record; numeric ranges not extracted)
- Brazilian gestational weight gain charts by pre-pregnancy BMI (weeks 10–40); median gain at 40 wk: underweight 14.1 kg, normal 13.8 kg, overweight 12.1 kg, obesity 8.9 kg (medians, not targets). These are the curves printed in the 2026 Caderneta | Kac G, Carrilho TRB, et al., Am J Clin Nutr 2021;113(5):1351-1360 — **PMID 33740055** | https://pubmed.ncbi.nlm.nih.gov/33740055/ | VERIFIED
- Follow-up validating Brazilian charts against outcomes | Carrilho TRB et al., Am J Clin Nutr 2023;117:414-425 | https://pubmed.ncbi.nlm.nih.gov/36811564/ | VERIFIED (record)
- WHO antenatal care: minimum **8 contacts** — first within 12 wk, then at 20, 26, 30, 34, 36, 38 and 40 wk; one ultrasound before 24 wk recommended | WHO news release, "New guidelines on antenatal care for a positive pregnancy experience", 7 Nov 2016 | https://www.who.int/news/item/07-11-2016-new-guidelines-on-antenatal-care-for-a-positive-pregnancy-experience | VERIFIED
- WHO ANC guideline itself | WHO recommendations on antenatal care for a positive pregnancy experience, 2016 | https://www.who.int/publications/i/item/9789241549912 ; PubMed record https://pubmed.ncbi.nlm.nih.gov/28079998/ | VERIFIED
- WHO intrapartum care | WHO recommendations: intrapartum care for a positive childbirth experience, 2018 | https://www.who.int/publications/i/item/9789241550215 ; PubMed record https://pubmed.ncbi.nlm.nih.gov/30070803/ | VERIFIED (titles/overview; specific labour definitions not extracted)
- Pre-eclampsia: high blood pressure first appearing after 20 wk, often third trimester; symptoms: swelling of face/hands, headache that will not go away, seeing spots/vision changes, upper abdominal or shoulder pain, nausea/vomiting in second half, sudden weight gain, difficulty breathing | ACOG FAQ, "Preeclampsia and High Blood Pressure During Pregnancy" (updated Apr 2022) | https://www.acog.org/womens-health/faqs/preeclampsia-and-high-blood-pressure-during-pregnancy | VERIFIED
- Pre-eclampsia (UK): most likely from 20 wk; severe headache, vision problems, pain below ribs, sudden swelling, feeling very unwell — needs immediate check | NHS, "Pre-eclampsia" | https://www.nhs.uk/conditions/pre-eclampsia/ | VERIFIED
- Pre-eclampsia, clinical | ACOG Practice Bulletin No. 222, 2020 | https://pubmed.ncbi.nlm.nih.gov/32443079/ | VERIFIED (record)
- Pre-eclampsia warning signs (Brazil) | Caderneta 2026, 4.4.1 | Caderneta URL | VERIFIED
- Preterm labour = before 37 wk; signs: cramps, change/increase in discharge, pelvic pressure, constant low dull backache, regular or frequent contractions, ruptured membranes | ACOG FAQ, "Preterm Labor and Birth" (reviewed Jan 2026) | https://www.acog.org/womens-health/faqs/preterm-labor-and-birth | VERIFIED
- Preterm labour (UK): under 37 wk with regular contractions, period-type pains, fluid gush/trickle, unusual backache → call maternity unit | NHS, "Premature labour and birth" | https://www.nhs.uk/pregnancy/labour-and-birth/premature-labour-and-birth/ | VERIFIED
- Preterm labour, clinical | ACOG Practice Bulletin No. 171, 2016 | https://pubmed.ncbi.nlm.nih.gov/27661654/ | VERIFIED (record)
- Labour signs / when to call (UK): contractions every 5 minutes or more often → call; urgent if waters break, bleeding, baby moving less, under 37 wk | NHS, "Signs that labour has begun" | https://www.nhs.uk/pregnancy/labour-and-birth/signs-that-labour-has-begun/ | VERIFIED
- Labour (US): go to hospital if waters break without contractions, heavy bleeding, constant severe pain, fetus moving less; first labour typically 12–18 h | ACOG FAQ, "How to Tell When Labor Begins" (reviewed Nov 2025) | https://www.acog.org/womens-health/faqs/how-to-tell-when-labor-begins | VERIFIED
- First movements (quickening): start between 16 and 24 wk; first pregnancy may be after 20 wk; tell midwife if nothing by 24 wk; no set number of movements, no need to count — learn the baby's usual pattern; reduced/changed pattern → call immediately | NHS, "Your baby's movements" | https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/ | VERIFIED
- Most women first feel movement at 18–20 wk (as early as 16 wk in later pregnancies); movements increase until 32 wk then plateau — they do not decrease near term | RCOG patient information, "Your baby's movements in pregnancy" (Feb 2019) | https://www.rcog.org.uk/for-the-public/browse-our-patient-information/your-babys-movements-in-pregnancy/ | VERIFIED
- Reduced fetal movements guideline | RCOG Green-top Guideline No. 57 | https://www.rcog.org.uk/guidance/browse-all-guidance/green-top-guidelines/reduced-fetal-movements-green-top-guideline-no-57/ | VERIFIED (title/summary; publication year not captured)
- Gestational diabetes screening 24–28 wk (earlier with risk factors) | ACOG FAQ, "Gestational Diabetes" (reviewed Apr 2026) | https://www.acog.org/womens-health/faqs/gestational-diabetes | VERIFIED
- Gestational diabetes, clinical | ACOG Practice Bulletin No. 190, 2018 | https://pubmed.ncbi.nlm.nih.gov/29370047/ | VERIFIED (record)
- Periviable birth = delivery from 20w0d to 25w6d | ACOG/SMFM Obstetric Care Consensus No. 6, Periviable Birth, Obstet Gynecol 2017 | https://pubmed.ncbi.nlm.nih.gov/28937572/ ; ACOG page: https://www.acog.org/clinical/guidance/obstetric-care-consensus/2017/10/periviable-birth | VERIFIED
- Extremely preterm = before 28 wk; with very rare exceptions babies born before 23 wk do not survive; survival rises between 23 and 25 wk with frequent serious disability | ACOG FAQ, "Extremely Preterm Birth" (reviewed Mar 2026) | https://www.acog.org/womens-health/faqs/extremely-preterm-birth | VERIFIED
- Maternal immunisation, clinical | ACOG Committee Opinion No. 741, 2018 | https://pubmed.ncbi.nlm.nih.gov/29794683/ | VERIFIED (record)

---

## Do-not-mix table (country differences)

| Item | Brazil (MS/SUS) | England (NHS) | USA (ACOG/CDC) | Spain | France (SA) |
|---|---|---|---|---|---|
| Minimum visits | 7 (2024/2026); old docs say 6 | 10 first baby / 7 otherwise | not verified | 6–9 (Ministry) / 7–10 (SEGO) | 7 compulsory exams |
| Routine scans | 1 listed (ideal 7–12 wk); morphology not guaranteed | 2: 10–14 and 18–21 (18+0–20+6) | not verified | 3 (SEGO): 11–13+6, 18–21+6, 34–36+6; Ministry guide: 2 | 3: 11–13+6, 20–24+6, 30–34+6 |
| Whooping cough vaccine | from 20 wk | from 16 wk, usually 20, ideally before 32 | 27–36 wk | from 27 wk (pref. 27–28) | from 2nd trimester, pref. 20–36 |
| Maternal RSV vaccine | from 28 wk, every pregnancy | from 28 wk, every pregnancy | 32–36 wk, seasonal, not repeated | not in common calendar (infant immunised) | 32–36 SA, seasonal |
| GBS screening | not routine (MS) | not routine | 36w0d–37w6d | 35–37 wk | not verified |
| Glucose test | 24–28 wk, all | 24–28 wk, only if risk factors | 24–28 wk, all | 24–28 wk, all | not verified |

---

## Ready-to-paste references (verified entries only)

```yaml
shared:
  - title: "How Your Fetus Grows During Pregnancy"
    source: "American College of Obstetricians and Gynecologists (ACOG)"
    url: "https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy"
  - title: "ACOG Committee Opinion No 579: Definition of term pregnancy"
    source: "Obstetrics & Gynecology, 2013;122(5):1139-1140"
    url: "https://pubmed.ncbi.nlm.nih.gov/24150030/"
  - title: "When Pregnancy Goes Past Your Due Date"
    source: "ACOG"
    url: "https://www.acog.org/womens-health/faqs/when-pregnancy-goes-past-your-due-date"
  - title: "Morning Sickness: Nausea and Vomiting of Pregnancy"
    source: "ACOG"
    url: "https://www.acog.org/womens-health/faqs/morning-sickness-nausea-and-vomiting-of-pregnancy"
  - title: "Exercise During Pregnancy"
    source: "ACOG"
    url: "https://www.acog.org/womens-health/faqs/exercise-during-pregnancy"
  - title: "Physical Activity and Exercise During Pregnancy and the Postpartum Period: ACOG Committee Opinion, Number 804"
    source: "Obstetrics & Gynecology, 2020;135(4):e178-e188"
    url: "https://pubmed.ncbi.nlm.nih.gov/32217980/"
  - title: "ACOG Committee opinion no. 548: weight gain during pregnancy"
    source: "Obstetrics & Gynecology, 2013;121(1):210-212"
    url: "https://pubmed.ncbi.nlm.nih.gov/23262962/"
  - title: "Preeclampsia and High Blood Pressure During Pregnancy"
    source: "ACOG"
    url: "https://www.acog.org/womens-health/faqs/preeclampsia-and-high-blood-pressure-during-pregnancy"
  - title: "Gestational Hypertension and Preeclampsia: ACOG Practice Bulletin, Number 222"
    source: "Obstetrics & Gynecology, 2020;135(6):e237-e260"
    url: "https://pubmed.ncbi.nlm.nih.gov/32443079/"
  - title: "Preterm Labor and Birth"
    source: "ACOG"
    url: "https://www.acog.org/womens-health/faqs/preterm-labor-and-birth"
  - title: "Extremely Preterm Birth"
    source: "ACOG"
    url: "https://www.acog.org/womens-health/faqs/extremely-preterm-birth"
  - title: "Obstetric Care Consensus No. 6: Periviable Birth"
    source: "ACOG / Society for Maternal-Fetal Medicine, Obstetrics & Gynecology, 2017;130(4):e187-e199"
    url: "https://pubmed.ncbi.nlm.nih.gov/28937572/"
  - title: "Gestational Diabetes"
    source: "ACOG"
    url: "https://www.acog.org/womens-health/faqs/gestational-diabetes"
  - title: "ACOG Practice Bulletin No. 190: Gestational Diabetes Mellitus"
    source: "Obstetrics & Gynecology, 2018;131(2):e49-e64"
    url: "https://pubmed.ncbi.nlm.nih.gov/29370047/"
  - title: "Routine Tests During Pregnancy"
    source: "ACOG"
    url: "https://www.acog.org/womens-health/faqs/routine-tests-during-pregnancy"
  - title: "How to Tell When Labor Begins"
    source: "ACOG"
    url: "https://www.acog.org/womens-health/faqs/how-to-tell-when-labor-begins"
  - title: "WHO recommendations on antenatal care for a positive pregnancy experience"
    source: "World Health Organization, 2016"
    url: "https://www.who.int/publications/i/item/9789241549912"
  - title: "New guidelines on antenatal care for a positive pregnancy experience"
    source: "World Health Organization, news release, 7 November 2016"
    url: "https://www.who.int/news/item/07-11-2016-new-guidelines-on-antenatal-care-for-a-positive-pregnancy-experience"
  - title: "WHO recommendations: intrapartum care for a positive childbirth experience"
    source: "World Health Organization, 2018"
    url: "https://www.who.int/publications/i/item/9789241550215"
  - title: "Preterm birth"
    source: "World Health Organization, fact sheet"
    url: "https://www.who.int/news-room/fact-sheets/detail/preterm-birth"
  - title: "Your baby's movements in pregnancy"
    source: "Royal College of Obstetricians and Gynaecologists (RCOG), patient information, 2019"
    url: "https://www.rcog.org.uk/for-the-public/browse-our-patient-information/your-babys-movements-in-pregnancy/"
  - title: "Reduced Fetal Movements (Green-top Guideline No. 57)"
    source: "Royal College of Obstetricians and Gynaecologists (RCOG)"
    url: "https://www.rcog.org.uk/guidance/browse-all-guidance/green-top-guidelines/reduced-fetal-movements-green-top-guideline-no-57/"
  - title: "ISUOG Practice Guidelines (updated): performance of 11-14-week ultrasound scan"
    source: "Ultrasound in Obstetrics & Gynecology, 2023;61(1):127-143"
    url: "https://pubmed.ncbi.nlm.nih.gov/36594739/"
  - title: "ISUOG Practice Guidelines (updated): performance of the routine mid-trimester fetal ultrasound scan"
    source: "Ultrasound in Obstetrics & Gynecology, 2022;59(6):840-856"
    url: "https://pubmed.ncbi.nlm.nih.gov/35592929/"

pt-BR:
  - title: "Caderneta Brasileira da Gestante"
    source: "Ministério da Saúde, Secretaria de Atenção Primária à Saúde, 1ª edição, 2026"
    url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/publicacoes/caderneta-brasileira-da-gestante.pdf"
  - title: "Atenção ao pré-natal de baixo risco (Cadernos de Atenção Básica, nº 32)"
    source: "Ministério da Saúde, 2012"
    url: "https://bvsms.saude.gov.br/bvs/publicacoes/cadernos_atencao_basica_32_prenatal.pdf"
  - title: "Pré-natal"
    source: "Ministério da Saúde, Saúde de A a Z"
    url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/g/gravidez/pre-natal"
  - title: "Calendário de Vacinação (Gestante)"
    source: "Ministério da Saúde, Programa Nacional de Imunizações"
    url: "https://www.gov.br/saude/pt-br/vacinacao/calendario"
  - title: "Vírus Sincicial Respiratório"
    source: "Ministério da Saúde, Saúde de A a Z"
    url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/v/vsr"
  - title: "Portaria GM/MS nº 5.350, de 12 de setembro de 2024 (Rede Alyne)"
    source: "Ministério da Saúde"
    url: "https://bvsms.saude.gov.br/bvs/saudelegis/gm/2024/prt5350_13_09_2024.html"
  - title: "Ministério da Saúde destina R$ 52 milhões para exames de pré-natal no SUS"
    source: "Ministério da Saúde, 25 de novembro de 2024"
    url: "https://www.gov.br/saude/pt-br/assuntos/noticias/2024/novembro/ministerio-da-saude-destina-r-52-milhoes-para-exames-de-pre-natal-no-sus"
  - title: "Posicionamento FEBRASGO em relação à Lei 14.598, sobre inclusão de exames no protocolo de assistência de rotina às gestantes brasileiras"
    source: "FEBRASGO, 14 de julho de 2023"
    url: "https://www.febrasgo.org.br/noticia/posicionamento-febrasgo-em-relacao-a-lei-14-598-sobre-inclusao-de-exames-no-protocolo-de-assistencia-de-rotina-as-gestantes-brasileiras/"
  - title: "Dia da Gestante: Febrasgo orienta sobre cuidados a saúde da mulher na gestação"
    source: "FEBRASGO"
    url: "https://www.febrasgo.org.br/noticia/dia-da-gestante-febrasgo-orienta-sobre-cuidados-a-saude-da-mulher-na-gestacao/"
  - title: "Gestational weight gain charts: results from the Brazilian Maternal and Child Nutrition Consortium"
    source: "Kac G, Carrilho TRB, et al. American Journal of Clinical Nutrition, 2021;113(5):1351-1360"
    url: "https://pubmed.ncbi.nlm.nih.gov/33740055/"
  - title: "Gestational weight gain according to the Brazilian charts and its association with maternal and infant adverse outcomes"
    source: "Carrilho TRB, et al. American Journal of Clinical Nutrition, 2023;117(2):414-425"
    url: "https://pubmed.ncbi.nlm.nih.gov/36811564/"
  - title: "Lei nº 11.108, de 7 de abril de 2005 (Lei do Acompanhante)"
    source: "Presidência da República"
    url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11108.htm"
  - title: "Lei nº 14.737, de 27 de novembro de 2023 (direito a acompanhante nos atendimentos de saúde)"
    source: "Presidência da República"
    url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14737.htm"
  - title: "Lei nº 11.634, de 27 de dezembro de 2007 (vinculação à maternidade)"
    source: "Presidência da República"
    url: "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2007/lei/l11634.htm"
  - title: "Lei nº 14.598, de 14 de junho de 2023 (exames em gestantes)"
    source: "Presidência da República"
    url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14598.htm"
  - title: "Consolidação das Leis do Trabalho, art. 392 (licença-maternidade)"
    source: "Presidência da República, Decreto-Lei nº 5.452/1943"
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm"
  - title: "Lei nº 8.213, de 24 de julho de 1991, art. 71 (salário-maternidade)"
    source: "Presidência da República"
    url: "https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm"

en:
  - title: "Your antenatal care and appointments"
    source: "NHS"
    url: "https://www.nhs.uk/pregnancy/your-pregnancy-care/your-antenatal-care-and-appointments/"
  - title: "12-week scan"
    source: "NHS"
    url: "https://www.nhs.uk/pregnancy/your-pregnancy-care/12-week-scan/"
  - title: "20-week scan"
    source: "NHS"
    url: "https://www.nhs.uk/pregnancy/your-pregnancy-care/20-week-scan/"
  - title: "NHS Fetal Anomaly Screening Programme (FASP): programme overview"
    source: "NHS England / GOV.UK"
    url: "https://www.gov.uk/guidance/fetal-anomaly-screening-programme-overview"
  - title: "Whooping cough vaccination in pregnancy"
    source: "NHS"
    url: "https://www.nhs.uk/pregnancy/keeping-well/whooping-cough-vaccination/"
  - title: "RSV vaccine"
    source: "NHS"
    url: "https://www.nhs.uk/vaccinations/rsv-vaccine/"
  - title: "Vaccinations in pregnancy"
    source: "NHS"
    url: "https://www.nhs.uk/pregnancy/keeping-well/vaccinations/"
  - title: "Your baby's movements"
    source: "NHS"
    url: "https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/"
  - title: "Pre-eclampsia"
    source: "NHS"
    url: "https://www.nhs.uk/conditions/pre-eclampsia/"
  - title: "Premature labour and birth"
    source: "NHS"
    url: "https://www.nhs.uk/pregnancy/labour-and-birth/premature-labour-and-birth/"
  - title: "Signs that labour has begun"
    source: "NHS"
    url: "https://www.nhs.uk/pregnancy/labour-and-birth/signs-that-labour-has-begun/"
  - title: "Gestational diabetes"
    source: "NHS"
    url: "https://www.nhs.uk/conditions/gestational-diabetes/"
  - title: "Group B strep"
    source: "NHS"
    url: "https://www.nhs.uk/conditions/group-b-strep/"
  - title: "Routine antenatal care for women and their babies: summary of NICE guidance"
    source: "Deshpande S, et al. BMJ, 2021;375:n2484"
    url: "https://pubmed.ncbi.nlm.nih.gov/34716150/"
  - title: "Vaccinating Pregnant Patients (Whooping Cough)"
    source: "Centers for Disease Control and Prevention (CDC)"
    url: "https://www.cdc.gov/pertussis/hcp/vaccine-recommendations/vaccinating-pregnant-patients.html"
  - title: "RSV Vaccine Guidance for Pregnant Women"
    source: "Centers for Disease Control and Prevention (CDC)"
    url: "https://www.cdc.gov/rsv/hcp/vaccine-clinical-guidance/pregnant-people.html"
  - title: "Preventing Group B Strep Disease in Newborns"
    source: "Centers for Disease Control and Prevention (CDC)"
    url: "https://www.cdc.gov/group-b-strep/prevention/index.html"
  - title: "The Tdap Vaccine and Pregnancy"
    source: "ACOG"
    url: "https://www.acog.org/womens-health/faqs/the-tdap-vaccine-and-pregnancy"
  - title: "The RSV Vaccine and Pregnancy"
    source: "ACOG"
    url: "https://www.acog.org/womens-health/faqs/the-rsv-vaccine-and-pregnancy"
  - title: "Group B Strep and Pregnancy"
    source: "ACOG"
    url: "https://www.acog.org/womens-health/faqs/group-b-strep-and-pregnancy"
  - title: "Prevention of Group B Streptococcal Early-Onset Disease in Newborns: ACOG Committee Opinion, Number 797"
    source: "Obstetrics & Gynecology, 2020;135(2):e51-e72"
    url: "https://pubmed.ncbi.nlm.nih.gov/31977795/"

es:
  - title: "Guía de práctica clínica de atención en el embarazo y puerperio"
    source: "Ministerio de Sanidad, Servicios Sociales e Igualdad, 2014"
    url: "https://www.sanidad.gob.es/organizacion/sns/planCalidadSNS/pdf/Guia_practica_AEP.pdf"
  - title: "Control prenatal del embarazo normal (protocolo actualizado en mayo de 2017)"
    source: "Sociedad Española de Ginecología y Obstetricia (SEGO)"
    url: "https://bibliotecavirtual.sego.es/uploads/app/1297/elements/file/file1681394356.pdf"
  - title: "Calendario común de vacunación e inmunización a lo largo de toda la vida. Calendario recomendado año 2026"
    source: "Ministerio de Sanidad, Consejo Interterritorial del SNS, diciembre de 2025"
    url: "https://www.sanidad.gob.es/areas/promocionPrevencion/vacunaciones/calendario/docs/CalendarioVacunacion_Todalavida.pdf"
  - title: "Tosferina (vacunación en embarazadas)"
    source: "Ministerio de Sanidad"
    url: "https://www.sanidad.gob.es/areas/promocionPrevencion/vacunaciones/programasDeVacunacion/embarazadas/tosferina.htm"
  - title: "Vacunación en grupos de riesgo: mujeres en edad fértil, embarazadas y puerperio"
    source: "Ministerio de Sanidad"
    url: "https://www.sanidad.gob.es/areas/promocionPrevencion/vacunaciones/programasDeVacunacion/riesgo/docs/Mujeres_embarazadas_puerperio.pdf"

fr:
  - title: "Vaccination des femmes enceintes — Repères pour votre pratique"
    source: "Santé publique France, novembre 2025"
    url: "https://www.santepubliquefrance.fr/sites/default/files/cadic_files/documents/spf00006413.pdf"
  - title: "Anomalies congénitales : la maladie"
    source: "Santé publique France"
    url: "https://www.santepubliquefrance.fr/anomalies-congenitales/la-maladie"
  - title: "Grossesse : examens médicaux"
    source: "Service-Public.fr (Direction de l'information légale et administrative), vérifié le 16 mars 2026"
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F963"
  - title: "Arrêté du 20 avril 2018 fixant les recommandations de bonnes pratiques relatives aux modalités de réalisation des examens d'imagerie concourant au diagnostic prénatal"
    source: "Journal officiel de la République française (Légifrance)"
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000036833452"
```

Notes on the YAML:
- The two `fr` entries from Service-Public.fr and Légifrance are official French government sources but outside the HAS/Ameli/SpF list in the brief. HAS and Ameli pages could not be opened from this network; if an editor can open them, swap them in.
- ACOG clinical page URLs redirect from `/clinical/clinical-guidance/.../articles/...` to `/clinical/guidance/...`; the PubMed URLs are the stable citation.
- ACOG and Légifrance pages only load in a real browser (automatic bot check) — an automated link checker may report 403 for them.
