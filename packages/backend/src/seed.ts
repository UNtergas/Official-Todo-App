import {UserRepository} from "./repositories/UserRepository";

const userRepository = UserRepository.getInstance();

const RepositoryToBeSeeded = [
    userRepository,
]

export async function seed() {
    const oneOfReposIsEmpty = await checkOneOfReposIsEmpty();
    if (oneOfReposIsEmpty) {
        await clean();
        await seedUser();
    }
}

export async function clean() {
    for(const repo of RepositoryToBeSeeded) {
        await repo.deleteMany();
    }
}

async function checkOneOfReposIsEmpty() {
    for (const repo in RepositoryToBeSeeded) {
        const numsRecord = await RepositoryToBeSeeded[repo].count();
        if (numsRecord === 0) return true;
    }
    return false;
}

async function seedUser() {
    await userRepository.createOne({
        email: "nkalk192002@gmail.com",
        name: "kean"
    });

    await userRepository.createOne({
        email: "tuan.nguyen@gmail.com",
        name: "tupac",
    });
}