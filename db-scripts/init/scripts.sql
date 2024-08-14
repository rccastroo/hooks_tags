CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL,
    email VARCHAR(180) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    active BOOLEAN NOT NULL,
    last_login TIMESTAMP
);
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    category VARCHAR(30) NOT NULL,
    active BOOLEAN NOT NULL
);
CREATE TABLE hooks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    link TEXT NOT NULL,
    active BOOLEAN NOT NULL,
    downloads INT NOT NULL
);
CREATE TABLE hooks_tags (
    hook_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (hook_id, tag_id),
    FOREIGN KEY (hook_id) REFERENCES public.hooks(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE
);
INSERT INTO public.customers ("name",email,"password",phone,active,last_login) VALUES
	 ('adm','exemple@hotmail.com','$2a$12$bjzU02Z/JO/spMJ6JjRkCO0Ezh5vE6VVLIGCN6lsfOKWtb/2Uahri','+55 21 99443-4501',true,'2024-08-06 00:29:13.152589');
INSERT INTO public.hooks (name, description, link, active, downloads) VALUES
    ('Eiffel Tower', 'Iconic Parisian landmark', 'https://example.com/eiffel-tower', true, 3),
    ('Statue of Liberty', 'Famous New York landmark', 'https://example.com/statue-of-liberty', true, 5),
    ('Great Wall of China', 'Ancient wall stretching across northern China', 'https://example.com/great-wall', true, 1),
    ('Machu Picchu', 'Ancient Incan city located in Peru', 'https://example.com/machu-picchu', true, 4),
    ('Colosseum', 'Ancient Roman gladiatorial arena in Rome', 'https://example.com/colosseum', true, 2);
INSERT INTO public.hooks (name, description, link, active, downloads) VALUES
    ('Taj Mahal', 'Mausoleum in India known for its white marble architecture', 'https://example.com/taj-mahal', true, 0),
    ('Sydney Opera House', 'Iconic performing arts center in Sydney', 'https://example.com/sydney-opera-house', true, 0),
    ('Christ the Redeemer', 'Large statue of Jesus in Rio de Janeiro', 'https://example.com/christ-the-redeemer', true, 0),
    ('Santorini', 'Beautiful Greek island known for its white buildings', 'https://example.com/santorini', true, 4);
INSERT INTO public.hooks (name, description, link, active, downloads) VALUES
    ('Grand Canyon', 'Massive canyon carved by the Colorado River', 'https://example.com/grand-canyon', true, 2),
    ('Big Ben', 'Famous clock tower in London', 'https://example.com/big-ben', true, 2),
    ('Marrakech', 'City in Morocco known for its vibrant markets', 'https://example.com/marrakech', true, 4),
    ('Venice', 'Italian city known for its canals', 'https://example.com/venice', true, 2);
INSERT INTO public.hooks (name, description, link, active, downloads) VALUES
    ('Kyoto', 'Japanese city known for its historic temples', 'https://example.com/kyoto', true, 0),
    ('Dubai', 'Modern city in the UAE known for its skyscrapers', 'https://example.com/dubai', true, 2),
    ('Mona Lisa', 'Famous painting by Leonardo da Vinci', 'https://example.com/mona-lisa', true, 6);
INSERT INTO public.hooks (name, description, link, active, downloads) VALUES	
    ('Stonehenge', 'Prehistoric monument in England', 'https://example.com/stonehenge', true, 1),
    ('Pyramids of Giza', 'Ancient Egyptian pyramids near Cairo', 'https://example.com/pyramids-of-giza', true, 4);			
INSERT INTO public.tags (name, category, active) VALUES
    ('Adventure', 'ação', true),
    ('Adventure Travel', 'ação', true),
    ('Gastronomic', 'ação', true),
    ('Festival', 'ação', true),
    ('Wellness', 'ação', true),
    ('Nightlife', 'ação', true);
INSERT INTO public.tags (name, category, active) VALUES
    ('Historical Sites', 'itens', true),
    ('Shopping', 'itens', true),
    ('Photography', 'itens', true),
    ('Historical', 'nicho', true),
    ('Scenic', 'nicho', true),
    ('Architectural', 'nicho', true);
INSERT INTO public.tags (name, category, active) VALUES
    ('Luxury', 'nicho', true),
    ('Nature', 'nicho', true),
    ('Romantic', 'nicho', true),
    ('Family-friendly', 'nicho', true);
INSERT INTO public.tags (name, category, active) VALUES
    ('Unique', 'nicho', true),
    ('Popular', 'nicho', true),
    ('Beach', 'nicho', true),
    ('Modern', 'nicho', true);
INSERT INTO public.tags (name, category, active) VALUES
    ('Ancient', 'nicho', true),
    ('Iconic', 'nicho', true),
    ('Vibrant', 'nicho', true),
    ('Peaceful', 'nicho', true);
INSERT INTO public.tags (name, category, active) VALUES
    ('Traditional', 'nicho', true),
    ('Urban', 'nicho', true),
    ('Artistic', 'nicho', true),
    ('Educational', 'nicho', true),
    ('Run', 'ação', true);
INSERT INTO public.hooks_tags (hook_id,tag_id) VALUES
	 (12,9),
	 (15,12),
	 (1,8),
	 (2,16),
	 (7,18),
	 (2,28),
	 (10,27),
	 (13,14),
	 (8,12),
	 (12,14);
INSERT INTO public.hooks_tags (hook_id,tag_id) VALUES
	 (9,29),
	 (13,3),
	 (12,6),
	 (13,6),
	 (5,20),
	 (15,21),
	 (14,26),
	 (13,27),
	 (14,29),
	 (1,26);
INSERT INTO public.hooks_tags (hook_id,tag_id) VALUES
	 (6,11),
	 (7,5),
	 (3,24),
	 (9,25),
	 (5,10),
	 (5,28),
	 (14,4),
	 (10,3),
	 (8,11),
	 (5,14);
INSERT INTO public.hooks_tags (hook_id,tag_id) VALUES
	 (6,24),
	 (8,5),
	 (1,29),
	 (10,17),
	 (7,14),
	 (3,29),
	 (4,24),
	 (3,9),
	 (1,23),
	 (1,17);
INSERT INTO public.hooks_tags (hook_id,tag_id) VALUES
	 (11,17),
	 (14,8),
	 (16,10),
	 (17,1),
	 (18,5),
	 (19,29),
	 (20,24);
