const request = require('supertest');
const app = require('../index');
const path = require('path');


describe('Express App', () => {

    let heroId;
    let filename;

    it('return first page array of superheroes', async () => {
        const response = await request(app).get('/api/superheroes?limit=5&page=1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('heroes');
        expect(response.body).toHaveProperty('totalCount');

        expect(typeof response.body.totalCount).toBe('number');
        expect(typeof response.body.heroes).toBe('object');
    });

    it('create new superhero', async () => {
        const response = await request(app).post('/api/superheroes').send({
            nickname: 'Test',
            real_name: 'Test',
            origin_description: 'Test',
            superpowers: 'Test',
            catch_phrase: 'Test',
            images: ['Test']
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('nickname');
        expect(response.body).toHaveProperty('real_name');
        expect(response.body).toHaveProperty('origin_description');
        expect(response.body).toHaveProperty('superpowers');
        expect(response.body).toHaveProperty('catch_phrase');
        expect(response.body).toHaveProperty('images');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');

        heroId = response.body._id;
    })

    it('return superhero by id', async () => {
        const response = await request(app).get(`/api/superheroes/${heroId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('nickname');
        expect(response.body).toHaveProperty('real_name');
        expect(response.body).toHaveProperty('origin_description');
        expect(response.body).toHaveProperty('superpowers');
        expect(response.body).toHaveProperty('catch_phrase');
        expect(response.body).toHaveProperty('images');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
    })

    it('update superhero by id', async () => {
        const updateHeroData = {
            nickname: 'Test2',
            real_name: 'Test2',
            origin_description: 'Test2',
            superpowers: 'Test2',
            catch_phrase: 'Test2',
            images: ['Test2']
        }
        const response = await request(app).put(`/api/superheroes/${heroId}`).send(updateHeroData);

        expect(response.status).toBe(200);

        expect(response.body._id).toBe(heroId);
        expect(response.body.nickname).toBe(updateHeroData.nickname);
        expect(response.body.real_name).toBe(updateHeroData.real_name);
        expect(response.body.origin_description).toBe(updateHeroData.origin_description);
        expect(response.body.superpowers).toBe(updateHeroData.superpowers);
        expect(response.body.images).toEqual(updateHeroData.images);
    })

    it('delete superhero by id', async () => {
        const response = await request(app).delete(`/api/superheroes/${heroId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(heroId);
    })

    it('upload image', async () => {
        const filePath = path.join(__dirname, 'images', 'testImage.jpg');

        const response = await request(app).post(`/api/superheroes/images`)
            .attach('image', filePath);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('filename');

        filename = response.body.filename;
    })

    it('delete image', async () => {
        const response = await request(app).del(`/api/superheroes/images`).send({ filename });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('filename');
    })

    it('404 everything else', async () => {
        const response = await request(app).get('/api/404');
        expect(response.status).toBe(404);
    })
});