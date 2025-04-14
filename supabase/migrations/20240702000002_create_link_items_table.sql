CREATE TABLE link_items (
    id SERIAL PRIMARY KEY,
    biolink_id INTEGER REFERENCES biolinks(id) ON DELETE CASCADE,
    type TEXT,
    url TEXT,
    title TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);