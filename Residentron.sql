--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2024-03-31 23:38:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 49213)
-- Name: amenities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.amenities (
    id integer NOT NULL,
    profile_id integer,
    amenity_name character varying(255) NOT NULL,
    booking_date date NOT NULL,
    booking_time time without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.amenities OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 49212)
-- Name: amenities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.amenities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.amenities_id_seq OWNER TO postgres;

--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 222
-- Name: amenities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.amenities_id_seq OWNED BY public.amenities.id;


--
-- TOC entry 215 (class 1259 OID 49154)
-- Name: auth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password text NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.auth OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 49153)
-- Name: auth_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_id_seq OWNER TO postgres;

--
-- TOC entry 3468 (class 0 OID 0)
-- Dependencies: 214
-- Name: auth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_id_seq OWNED BY public.auth.id;


--
-- TOC entry 231 (class 1259 OID 49277)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    profile_id integer,
    event_name character varying(255) NOT NULL,
    event_datetime timestamp without time zone NOT NULL,
    event_type character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 49276)
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO postgres;

--
-- TOC entry 3469 (class 0 OID 0)
-- Dependencies: 230
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- TOC entry 217 (class 1259 OID 49167)
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    phone_number character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 49166)
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profile_id_seq OWNER TO postgres;

--
-- TOC entry 3470 (class 0 OID 0)
-- Dependencies: 216
-- Name: profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profile_id_seq OWNED BY public.profile.id;


--
-- TOC entry 227 (class 1259 OID 49246)
-- Name: repair; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.repair (
    id integer NOT NULL,
    profile_id integer,
    appliance_name character varying(255) NOT NULL,
    repair_person character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    cancelled_at timestamp without time zone
);


ALTER TABLE public.repair OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 49245)
-- Name: repair_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.repair_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.repair_id_seq OWNER TO postgres;

--
-- TOC entry 3471 (class 0 OID 0)
-- Dependencies: 226
-- Name: repair_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.repair_id_seq OWNED BY public.repair.id;


--
-- TOC entry 225 (class 1259 OID 49227)
-- Name: services; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.services (
    id integer NOT NULL,
    profile_id integer,
    service_id character varying(255) NOT NULL,
    service_name character varying(255) NOT NULL,
    service_man character varying(255) NOT NULL,
    subscription boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    cancelled_at timestamp without time zone
);


ALTER TABLE public.services OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 49226)
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.services_id_seq OWNER TO postgres;

--
-- TOC entry 3472 (class 0 OID 0)
-- Dependencies: 224
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- TOC entry 219 (class 1259 OID 49180)
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    profile_id integer,
    transaction_id character varying(255) NOT NULL,
    amount numeric(10,2) NOT NULL,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 49179)
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transaction_id_seq OWNER TO postgres;

--
-- TOC entry 3473 (class 0 OID 0)
-- Dependencies: 218
-- Name: transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_id_seq OWNED BY public.transaction.id;


--
-- TOC entry 221 (class 1259 OID 49195)
-- Name: utility; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utility (
    id integer NOT NULL,
    profile_id integer,
    utility_id character varying(255) NOT NULL,
    used_date date NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.utility OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 49194)
-- Name: utility_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.utility_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.utility_id_seq OWNER TO postgres;

--
-- TOC entry 3474 (class 0 OID 0)
-- Dependencies: 220
-- Name: utility_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.utility_id_seq OWNED BY public.utility.id;


--
-- TOC entry 232 (class 1259 OID 57344)
-- Name: varsha_a_wing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.varsha_a_wing (
    room_number character varying(10) NOT NULL,
    name character varying(100),
    ownership_type character varying(50),
    parking character varying(50)
);


ALTER TABLE public.varsha_a_wing OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 57349)
-- Name: varsha_b_wing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.varsha_b_wing (
    room_number character varying(10) NOT NULL,
    name character varying(100),
    ownership_type character varying(50),
    parking character varying(50)
);


ALTER TABLE public.varsha_b_wing OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 57354)
-- Name: varsha_c_wing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.varsha_c_wing (
    room_number character varying(10) NOT NULL,
    name character varying(100),
    ownership_type character varying(50),
    parking character varying(50)
);


ALTER TABLE public.varsha_c_wing OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 57359)
-- Name: varsha_d_wing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.varsha_d_wing (
    room_number character varying(10) NOT NULL,
    name character varying(100),
    ownership_type character varying(50),
    parking character varying(50)
);


ALTER TABLE public.varsha_d_wing OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 49261)
-- Name: visitors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.visitors (
    id integer NOT NULL,
    profile_id integer,
    visitor_name character varying(255) NOT NULL,
    visitor_contact character varying(20) NOT NULL,
    visitor_in_time timestamp without time zone NOT NULL,
    visitor_out_time timestamp without time zone,
    visitor_vehicle character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.visitors OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 49260)
-- Name: visitors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.visitors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.visitors_id_seq OWNER TO postgres;

--
-- TOC entry 3475 (class 0 OID 0)
-- Dependencies: 228
-- Name: visitors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.visitors_id_seq OWNED BY public.visitors.id;


--
-- TOC entry 3238 (class 2604 OID 49216)
-- Name: amenities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.amenities ALTER COLUMN id SET DEFAULT nextval('public.amenities_id_seq'::regclass);


--
-- TOC entry 3229 (class 2604 OID 49157)
-- Name: auth id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth ALTER COLUMN id SET DEFAULT nextval('public.auth_id_seq'::regclass);


--
-- TOC entry 3250 (class 2604 OID 49280)
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 49170)
-- Name: profile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile ALTER COLUMN id SET DEFAULT nextval('public.profile_id_seq'::regclass);


--
-- TOC entry 3245 (class 2604 OID 49249)
-- Name: repair id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repair ALTER COLUMN id SET DEFAULT nextval('public.repair_id_seq'::regclass);


--
-- TOC entry 3241 (class 2604 OID 49230)
-- Name: services id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 49183)
-- Name: transaction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 49198)
-- Name: utility id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utility ALTER COLUMN id SET DEFAULT nextval('public.utility_id_seq'::regclass);


--
-- TOC entry 3247 (class 2604 OID 49264)
-- Name: visitors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visitors ALTER COLUMN id SET DEFAULT nextval('public.visitors_id_seq'::regclass);


--
-- TOC entry 3449 (class 0 OID 49213)
-- Dependencies: 223
-- Data for Name: amenities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.amenities (id, profile_id, amenity_name, booking_date, booking_time, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3441 (class 0 OID 49154)
-- Dependencies: 215
-- Data for Name: auth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth (id, username, password, email) FROM stdin;
\.


--
-- TOC entry 3457 (class 0 OID 49277)
-- Dependencies: 231
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, profile_id, event_name, event_datetime, event_type, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3443 (class 0 OID 49167)
-- Dependencies: 217
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (id, name, email, password, phone_number, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3453 (class 0 OID 49246)
-- Dependencies: 227
-- Data for Name: repair; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.repair (id, profile_id, appliance_name, repair_person, created_at, cancelled_at) FROM stdin;
\.


--
-- TOC entry 3451 (class 0 OID 49227)
-- Dependencies: 225
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.services (id, profile_id, service_id, service_name, service_man, subscription, created_at, updated_at, cancelled_at) FROM stdin;
\.


--
-- TOC entry 3445 (class 0 OID 49180)
-- Dependencies: 219
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction (id, profile_id, transaction_id, amount, created_date) FROM stdin;
\.


--
-- TOC entry 3447 (class 0 OID 49195)
-- Dependencies: 221
-- Data for Name: utility; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utility (id, profile_id, utility_id, used_date, name, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3458 (class 0 OID 57344)
-- Dependencies: 232
-- Data for Name: varsha_a_wing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.varsha_a_wing (room_number, name, ownership_type, parking) FROM stdin;
A-101	Rajesh Kumar	Owner	Car
A-102	Priya Patel	Owner	Car
A-201	Ankit Sharma	Tenant	Motorcycle
A-202	Sneha Gupta	Owner	Scooty
A-301	Rakesh Singh	Owner	Motorcycle
A-302	Nidhi Verma	Tenant	Car
A-401	Manish Jain	Owner	Scooty
A-402	Aarti Tiwari	Tenant	Scooty
A-501	Sanjay Mishra	Owner	Car
A-502	Pooja Reddy	Tenant	Scooty
\.


--
-- TOC entry 3459 (class 0 OID 57349)
-- Dependencies: 233
-- Data for Name: varsha_b_wing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.varsha_b_wing (room_number, name, ownership_type, parking) FROM stdin;
B-101	Rohan Joshi	Owner	Car
B-102	Ayesha Khan	Owner	Motorcycle
B-201	Sanjay Trivedi	Tenant	Car
B-202	Meera Rao	Owner	Scooty
B-301	Karan Malhotra	Owner	Scooty
B-302	Pooja Desai	Tenant	Car
B-401	Vishal Sharma	Owner	Motorcycle
B-402	Anjali Reddy	Tenant	Motorcycle
B-501	Manish Gupta	Tenant	Car
B-502	Sneha Singhania	Owner	Car
\.


--
-- TOC entry 3460 (class 0 OID 57354)
-- Dependencies: 234
-- Data for Name: varsha_c_wing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.varsha_c_wing (room_number, name, ownership_type, parking) FROM stdin;
C-101	Rahul Shah	Owner	Scooty
C-102	Kritika Sengupta	Tenant	Motorcycle
C-201	Devansh Patel	Owner	Scooty
C-202	Tanvi Iyer	Tenant	Motorcycle
C-301	Siddharth Choudhary	Owner	Car
C-302	Nidhi Mehra	Owner	Car
C-401	Alok Singh	Tenant	Scooty
C-402	Natasha Ahuja	Tenant	Scooty
C-501	Rajat Sharma	Owner	Car
5-502	Ritu Kapoor	Tenant	Motorcycle
\.


--
-- TOC entry 3461 (class 0 OID 57359)
-- Dependencies: 235
-- Data for Name: varsha_d_wing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.varsha_d_wing (room_number, name, ownership_type, parking) FROM stdin;
D-101	Vikas Gupta	Owner	Car
D-102	Anushka Singh	Owner	Car
D-201	Aman Verma	Tenant	Motorcycle
D-202	Neha Mishra	Tenant	Scooty
D-301	Mohit Kapoor	Tenant	Car
D-302	Jyoti Yadav	Owner	Scooty
D-401	Arnav Malhotra	Tenant	Scooty
D-402	Shalini Patel	Owner	Motorcycle
D-501	Varun Khanna	Tenant	Car
D-502	Preeti Mehta	Owner	Car
\.


--
-- TOC entry 3455 (class 0 OID 49261)
-- Dependencies: 229
-- Data for Name: visitors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.visitors (id, profile_id, visitor_name, visitor_contact, visitor_in_time, visitor_out_time, visitor_vehicle, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 222
-- Name: amenities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.amenities_id_seq', 1, false);


--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 214
-- Name: auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_id_seq', 1, false);


--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 230
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 216
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_id_seq', 1, false);


--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 226
-- Name: repair_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.repair_id_seq', 1, false);


--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 224
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.services_id_seq', 1, false);


--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 218
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 1, false);


--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 220
-- Name: utility_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utility_id_seq', 1, false);


--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 228
-- Name: visitors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.visitors_id_seq', 1, false);


--
-- TOC entry 3272 (class 2606 OID 49220)
-- Name: amenities amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.amenities
    ADD CONSTRAINT amenities_pkey PRIMARY KEY (id);


--
-- TOC entry 3254 (class 2606 OID 49165)
-- Name: auth auth_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth
    ADD CONSTRAINT auth_email_key UNIQUE (email);


--
-- TOC entry 3256 (class 2606 OID 49161)
-- Name: auth auth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth
    ADD CONSTRAINT auth_pkey PRIMARY KEY (id);


--
-- TOC entry 3258 (class 2606 OID 49163)
-- Name: auth auth_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth
    ADD CONSTRAINT auth_username_key UNIQUE (username);


--
-- TOC entry 3282 (class 2606 OID 49284)
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- TOC entry 3260 (class 2606 OID 49178)
-- Name: profile profile_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_email_key UNIQUE (email);


--
-- TOC entry 3262 (class 2606 OID 49176)
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


--
-- TOC entry 3278 (class 2606 OID 49254)
-- Name: repair repair_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repair
    ADD CONSTRAINT repair_pkey PRIMARY KEY (id);


--
-- TOC entry 3274 (class 2606 OID 49237)
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- TOC entry 3276 (class 2606 OID 49239)
-- Name: services services_service_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_service_id_key UNIQUE (service_id);


--
-- TOC entry 3264 (class 2606 OID 49186)
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


--
-- TOC entry 3266 (class 2606 OID 49188)
-- Name: transaction transaction_transaction_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_transaction_id_key UNIQUE (transaction_id);


--
-- TOC entry 3268 (class 2606 OID 49204)
-- Name: utility utility_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utility
    ADD CONSTRAINT utility_pkey PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 49206)
-- Name: utility utility_utility_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utility
    ADD CONSTRAINT utility_utility_id_key UNIQUE (utility_id);


--
-- TOC entry 3284 (class 2606 OID 57348)
-- Name: varsha_a_wing varsha_a_wing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.varsha_a_wing
    ADD CONSTRAINT varsha_a_wing_pkey PRIMARY KEY (room_number);


--
-- TOC entry 3286 (class 2606 OID 57353)
-- Name: varsha_b_wing varsha_b_wing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.varsha_b_wing
    ADD CONSTRAINT varsha_b_wing_pkey PRIMARY KEY (room_number);


--
-- TOC entry 3288 (class 2606 OID 57358)
-- Name: varsha_c_wing varsha_c_wing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.varsha_c_wing
    ADD CONSTRAINT varsha_c_wing_pkey PRIMARY KEY (room_number);


--
-- TOC entry 3290 (class 2606 OID 57363)
-- Name: varsha_d_wing varsha_d_wing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.varsha_d_wing
    ADD CONSTRAINT varsha_d_wing_pkey PRIMARY KEY (room_number);


--
-- TOC entry 3280 (class 2606 OID 49270)
-- Name: visitors visitors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visitors
    ADD CONSTRAINT visitors_pkey PRIMARY KEY (id);


--
-- TOC entry 3293 (class 2606 OID 49221)
-- Name: amenities amenities_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.amenities
    ADD CONSTRAINT amenities_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- TOC entry 3297 (class 2606 OID 49285)
-- Name: events events_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- TOC entry 3295 (class 2606 OID 49255)
-- Name: repair repair_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repair
    ADD CONSTRAINT repair_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- TOC entry 3294 (class 2606 OID 49240)
-- Name: services services_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- TOC entry 3291 (class 2606 OID 49189)
-- Name: transaction transaction_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- TOC entry 3292 (class 2606 OID 49207)
-- Name: utility utility_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utility
    ADD CONSTRAINT utility_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


--
-- TOC entry 3296 (class 2606 OID 49271)
-- Name: visitors visitors_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visitors
    ADD CONSTRAINT visitors_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;


-- Completed on 2024-03-31 23:38:48

--
-- PostgreSQL database dump complete
--

