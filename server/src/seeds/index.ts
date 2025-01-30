import { seedRecipes } from './recipe-seeds-mongo'
import { seedUsers } from './user-seeds-mongo';

const runSeeds = async () => {
  try {
    console.log('Seeding users...');
    await seedUsers();
    console.log('Seeding recipes...');
    await seedRecipes();
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error running seeds:', error);
  } finally {
    process.exit(); 
  }
};

runSeeds();
