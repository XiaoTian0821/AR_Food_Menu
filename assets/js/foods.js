/**
 * 3D Food Models Library
 * Creates stylized low-poly food models using Three.js
 */

const FOOD_MODELS = {
    burger: 'Burger',
    pizza: 'Pizza',
    pasta: 'Pasta',
    'fried-chicken': 'Fried Chicken',
    salad: 'Salad',
    skewers: 'Skewers',
    juice: 'Juice',
    wrap: 'Wrap',
    kebab: 'Kebab',
    roast: 'Roast',
    coffee: 'Coffee',
    smoothie: 'Smoothie',
    'iced-coffee': 'Iced Coffee',
    'fried-platter': 'Fried Platter'
};

/**
 * Create a Burger model
 */
function createBurger() {
    const group = new THREE.Group();
    
    // Bottom bun
    const bunGeo = new THREE.SphereGeometry(0.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const bunMat = new THREE.MeshStandardMaterial({ color: 0xd4a574 });
    const bottomBun = new THREE.Mesh(bunGeo, bunMat);
    bottomBun.position.y = -0.3;
    group.add(bottomBun);
    
    // Patty
    const pattyGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.1, 16);
    const pattyMat = new THREE.MeshStandardMaterial({ color: 0x6b3a2a });
    const patty = new THREE.Mesh(pattyGeo, pattyMat);
    patty.position.y = -0.15;
    group.add(patty);
    
    // Cheese
    const cheeseGeo = new THREE.BoxGeometry(0.9, 0.05, 0.9);
    const cheeseMat = new THREE.MeshStandardMaterial({ color: 0xffd700 });
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheese.position.y = -0.05;
    group.add(cheese);
    
    // Lettuce
    const lettuceGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.05, 16);
    const lettuceMat = new THREE.MeshStandardMaterial({ color: 0x4a7c23 });
    const lettuce = new THREE.Mesh(lettuceGeo, lettuceMat);
    lettuce.position.y = 0.02;
    group.add(lettuce);
    
    // Tomato
    const tomatoGeo = new THREE.SphereGeometry(0.2, 12, 8);
    const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const tomato = new THREE.Mesh(tomatoGeo, tomatoMat);
    tomato.position.y = 0.08;
    group.add(tomato);
    
    // Top bun
    const topBunGeo = new THREE.SphereGeometry(0.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const topBun = new THREE.Mesh(topBunGeo, bunMat);
    topBun.position.y = 0.15;
    group.add(topBun);
    
    // Sesame seeds
    for (let i = 0; i < 8; i++) {
        const seedGeo = new THREE.SphereGeometry(0.03, 6, 4);
        const seedMat = new THREE.MeshStandardMaterial({ color: 0xfff8dc });
        const seed = new THREE.Mesh(seedGeo, seedMat);
        const angle = (i / 8) * Math.PI * 2;
        seed.position.set(Math.cos(angle) * 0.25, 0.35, Math.sin(angle) * 0.25);
        group.add(seed);
    }
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

/**
 * Create a Pizza model
 */
function createPizza() {
    const group = new THREE.Group();
    
    // Pizza base
    const baseGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.05, 24);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0xf4d03f });
    const base = new THREE.Mesh(baseGeo, baseMat);
    group.add(base);
    
    // Cheese
    const cheeseGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.02, 24);
    const cheeseMat = new THREE.MeshStandardMaterial({ color: 0xffd93d });
    const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
    cheese.position.y = 0.03;
    group.add(cheese);
    
    // Pepperoni
    const pepperoniMat = new THREE.MeshStandardMaterial({ color: 0xc0392b });
    for (let i = 0; i < 6; i++) {
        const pepGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 12);
        const pep = new THREE.Mesh(pepGeo, pepperoniMat);
        const angle = (i / 6) * Math.PI * 2;
        pep.position.set(Math.cos(angle) * 0.25, 0.05, Math.sin(angle) * 0.25);
        group.add(pep);
    }
    
    // Olives
    const oliveMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
    for (let i = 0; i < 4; i++) {
        const oliveGeo = new THREE.TorusGeometry(0.04, 0.015, 8, 12);
        const olive = new THREE.Mesh(oliveGeo, oliveMat);
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        olive.position.set(Math.cos(angle) * 0.35, 0.05, Math.sin(angle) * 0.35);
        olive.rotation.x = Math.PI / 2;
        group.add(olive);
    }
    
    // Basil leaves
    const basilMat = new THREE.MeshStandardMaterial({ color: 0x27ae60 });
    for (let i = 0; i < 3; i++) {
        const leafGeo = new THREE.SphereGeometry(0.04, 6, 4);
        leafGeo.scale(1, 0.3, 1.5);
        const leaf = new THREE.Mesh(leafGeo, basilMat);
        const angle = (i / 3) * Math.PI * 2;
        leaf.position.set(Math.cos(angle) * 0.15, 0.06, Math.sin(angle) * 0.15);
        leaf.rotation.y = angle;
        group.add(leaf);
    }
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

/**
 * Create a Pasta model
 */
function createPasta() {
    const group = new THREE.Group();
    
    // Plate
    const plateGeo = new THREE.CylinderGeometry(0.5, 0.45, 0.05, 24);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xecf0f1 });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    group.add(plate);
    
    // Pasta mound
    const pastaMat = new THREE.MeshStandardMaterial({ color: 0xf39c12 });
    for (let i = 0; i < 15; i++) {
        const strandGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3 + Math.random() * 0.2, 6);
        const strand = new THREE.Mesh(strandGeo, pastaMat);
        strand.position.set(
            (Math.random() - 0.5) * 0.3,
            0.1 + Math.random() * 0.15,
            (Math.random() - 0.5) * 0.3
        );
        strand.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        group.add(strand);
    }
    
    // Tomato sauce spots
    const sauceMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c });
    for (let i = 0; i < 5; i++) {
        const sauceGeo = new THREE.SphereGeometry(0.05, 8, 6);
        const sauce = new THREE.Mesh(sauceGeo, sauceMat);
        sauce.position.set(
            (Math.random() - 0.5) * 0.25,
            0.15 + Math.random() * 0.1,
            (Math.random() - 0.5) * 0.25
        );
        sauce.scale.y = 0.5;
        group.add(sauce);
    }
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

/**
 * Create a Fried Chicken model
 */
function createFriedChicken() {
    const group = new THREE.Group();
    
    // Chicken pieces
    const chickenMat = new THREE.MeshStandardMaterial({ color: 0xd4a574 });
    
    // Drumstick
    const drumGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.4, 12);
    const drum = new THREE.Mesh(drumGeo, chickenMat);
    drum.position.set(-0.15, 0, 0);
    drum.rotation.z = 0.2;
    group.add(drum);
    
    // Bone
    const boneGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8);
    const boneMat = new THREE.MeshStandardMaterial({ color: 0xf5f5dc });
    const bone = new THREE.Mesh(boneGeo, boneMat);
    bone.position.set(-0.22, -0.2, 0);
    bone.rotation.z = 0.2;
    group.add(bone);
    
    // Breast piece
    const breastGeo = new THREE.SphereGeometry(0.2, 12, 8);
    breastGeo.scale(1, 0.7, 0.8);
    const breast = new THREE.Mesh(breastGeo, chickenMat);
    breast.position.set(0.15, 0.05, 0);
    group.add(breast);
    
    // Wing
    const wingGeo = new THREE.SphereGeometry(0.12, 10, 8);
    wingGeo.scale(1.2, 0.5, 0.6);
    const wing = new THREE.Mesh(wingGeo, chickenMat);
    wing.position.set(0, 0.15, 0.1);
    wing.rotation.x = 0.3;
    group.add(wing);
    
    // Breading texture
    const textureMat = new THREE.MeshStandardMaterial({ color: 0xc9a86c });
    for (let i = 0; i < 10; i++) {
        const bumpGeo = new THREE.SphereGeometry(0.02 + Math.random() * 0.02, 6, 4);
        const bump = new THREE.Mesh(bumpGeo, textureMat);
        bump.position.set(
            (Math.random() - 0.5) * 0.3,
            Math.random() * 0.2,
            (Math.random() - 0.5) * 0.2
        );
        group.add(bump);
    }
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

/**
 * Create a Salad model
 */
function createSalad() {
    const group = new THREE.Group();
    
    // Bowl
    const bowlGeo = new THREE.SphereGeometry(0.4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const bowlMat = new THREE.MeshStandardMaterial({ color: 0xecf0f1 });
    const bowl = new THREE.Mesh(bowlGeo, bowlMat);
    bowl.position.y = -0.1;
    group.add(bowl);
    
    // Lettuce
    const lettuceMat = new THREE.MeshStandardMaterial({ color: 0x27ae60 });
    for (let i = 0; i < 8; i++) {
        const leafGeo = new THREE.SphereGeometry(0.08, 8, 6);
        leafGeo.scale(1, 0.3, 1.5);
        const leaf = new THREE.Mesh(leafGeo, lettuceMat);
        const angle = (i / 8) * Math.PI * 2;
        leaf.position.set(Math.cos(angle) * 0.2, 0.2, Math.sin(angle) * 0.2);
        leaf.rotation.set(0.3, angle, 0);
        group.add(leaf);
    }
    
    // Tomatoes
    const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c });
    for (let i = 0; i < 4; i++) {
        const tomatoGeo = new THREE.SphereGeometry(0.05, 8, 6);
        const tomato = new THREE.Mesh(tomatoGeo, tomatoMat);
        const angle = (i / 4) * Math.PI * 2;
        tomato.position.set(Math.cos(angle) * 0.15, 0.3, Math.sin(angle) * 0.15);
        group.add(tomato);
    }
    
    // Croutons
    const croutonMat = new THREE.MeshStandardMaterial({ color: 0xd4a574 });
    for (let i = 0; i < 5; i++) {
        const croutonGeo = new THREE.BoxGeometry(0.04, 0.04, 0.04);
        const crouton = new THREE.Mesh(croutonGeo, croutonMat);
        crouton.position.set(
            (Math.random() - 0.5) * 0.2,
            0.25 + Math.random() * 0.1,
            (Math.random() - 0.5) * 0.2
        );
        crouton.rotation.set(Math.random(), Math.random(), Math.random());
        group.add(crouton);
    }
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

/**
 * Create a Skewers model
 */
function createSkewers() {
    const group = new THREE.Group();
    
    // Skewer stick
    const stickGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8);
    const stickMat = new THREE.MeshStandardMaterial({ color: 0xd4a574 });
    const stick = new THREE.Mesh(stickGeo, stickMat);
    stick.rotation.z = Math.PI / 6;
    group.add(stick);
    
    // Meat pieces
    const meatMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    for (let i = 0; i < 5; i++) {
        const meatGeo = new THREE.BoxGeometry(0.1, 0.08, 0.08);
        const meat = new THREE.Mesh(meatGeo, meatMat);
        meat.position.set(
            0,
            -0.25 + i * 0.1,
            0
        );
        meat.rotation.z = Math.PI / 6;
        group.add(meat);
    }
    
    // Vegetables
    const vegColors = [0x27ae60, 0xe74c3c, 0xf39c12];
    for (let i = 0; i < 3; i++) {
        const vegGeo = new THREE.SphereGeometry(0.05, 8, 6);
        const vegMat = new THREE.MeshStandardMaterial({ color: vegColors[i] });
        const veg = new THREE.Mesh(vegGeo, vegMat);
        veg.position.set(
            0,
            -0.2 + i * 0.15,
            0.06
        );
        veg.rotation.z = Math.PI / 6;
        group.add(veg);
    }
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

/**
 * Create a Juice model
 */
function createJuice() {
    const group = new THREE.Group();
    
    // Glass
    const glassGeo = new THREE.CylinderGeometry(0.15, 0.12, 0.4, 16, 1, true);
    const glassMat = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.3 
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    group.add(glass);
    
    // Juice
    const juiceMat = new THREE.MeshStandardMaterial({ color: 0xff8c00 });
    const juiceGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.3, 16);
    const juice = new THREE.Mesh(juiceGeo, juiceMat);
    juice.position.y = -0.05;
    group.add(juice);
    
    // Straw
    const strawGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.35, 8);
    const strawMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c });
    const straw = new THREE.Mesh(strawGeo, strawMat);
    straw.position.set(0.05, 0.1, 0);
    straw.rotation.z = -0.15;
    group.add(straw);
    
    // Lemon slice
    const lemonGeo = new THREE.TorusGeometry(0.06, 0.015, 8, 16);
    const lemonMat = new THREE.MeshStandardMaterial({ color: 0xffeb3b });
    const lemon = new THREE.Mesh(lemonGeo, lemonMat);
    lemon.position.set(0.15, 0.15, 0);
    lemon.rotation.y = Math.PI / 2;
    group.add(lemon);
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

/**
 * Create a Wrap model
 */
function createWrap() {
    const group = new THREE.Group();
    
    // Wrap body
    const wrapGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 16);
    const wrapMat = new THREE.MeshStandardMaterial({ color: 0xf5deb3 });
    const wrap = new THREE.Mesh(wrapGeo, wrapMat);
    wrap.rotation.z = Math.PI / 2;
    group.add(wrap);
    
    // Ends
    const endGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.05, 16);
    const end1 = new THREE.Mesh(endGeo, wrapMat);
    end1.position.x = 0.25;
    end1.rotation.z = Math.PI / 2;
    group.add(end1);
    
    const end2 = new THREE.Mesh(endGeo, wrapMat);
    end2.position.x = -0.25;
    end2.rotation.z = Math.PI / 2;
    group.add(end2);
    
    // Filling peeking out
    const fillingMat = new THREE.MeshStandardMaterial({ color: 0x27ae60 });
    const fillingGeo = new THREE.SphereGeometry(0.08, 8, 6);
    const filling = new THREE.Mesh(fillingGeo, fillingMat);
    filling.position.set(0.22, 0.05, 0);
    group.add(filling);
    
    // Paper wrapper lines
    const lineMat = new THREE.MeshStandardMaterial({ color: 0xd4a574 });
    for (let i = 0; i < 3; i++) {
        const lineGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.45, 6);
        const line = new THREE.Mesh(lineGeo, lineMat);
        line.position.set(
            -0.15 + i * 0.15,
            0,
            0.19
        );
        group.add(line);
    }
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

/**
 * Create a Kebab model
 */
function createKebab() {
    const group = new THREE.Group();
    
    // Vertical skewer
    const stickGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.7, 8);
    const stickMat = new THREE.MeshStandardMaterial({ color: 0xd4a574 });
    const stick = new THREE.Mesh(stickGeo, stickMat);
    group.add(stick);
    
    // Meat slices
    const meatMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    for (let i = 0; i < 6; i++) {
        const meatGeo = new THREE.TorusGeometry(0.12, 0.04, 8, 16);
        const meat = new THREE.Mesh(meatGeo, meatMat);
        meat.position.y = -0.25 + i * 0.1;
        meat.rotation.x = Math.PI / 2;
        group.add(meat);
    }
    
    // Bell pepper pieces
    const pepperColors = [0x27ae60, 0xe74c3c, 0xf39c12];
    for (let i = 0; i < 3; i++) {
        const pepperGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
        const pepperMat = new THREE.MeshStandardMaterial({ color: pepperColors[i] });
        const pepper = new THREE.Mesh(pepperGeo, pepperMat);
        pepper.position.set(
            0.1,
            -0.2 + i * 0.15,
            0
        );
        pepper.rotation.y = Math.PI / 4;
        group.add(pepper);
    }
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

/**
 * Create a Roast model
 */
function createRoast() {
    const group = new THREE.Group();
    
    // Roast meat
    const meatGeo = new THREE.SphereGeometry(0.35, 16, 12);
    meatGeo.scale(1, 0.7, 0.8);
    const meatMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const meat = new THREE.Mesh(meatGeo, meatMat);
    group.add(meat);
    
    // Fat marbling
    const fatMat = new THREE.MeshStandardMaterial({ color: 0xf5f5dc });
    for (let i = 0; i < 5; i++) {
        const fatGeo = new THREE.TorusGeometry(0.08, 0.02, 6, 12);
        const fat = new THREE.Mesh(fatGeo, fatMat);
        fat.position.set(
            (Math.random() - 0.5) * 0.3,
            (Math.random() - 0.5) * 0.2,
            0.25
        );
        fat.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        group.add(fat);
    }
    
    // Herbs
    const herbMat = new THREE.MeshStandardMaterial({ color: 0x27ae60 });
    for (let i = 0; i < 3; i++) {
        const herbGeo = new THREE.SphereGeometry(0.04, 6, 4);
        herbGeo.scale(1, 0.5, 1.5);
        const herb = new THREE.Mesh(herbGeo, herbMat);
        const angle = (i / 3) * Math.PI * 2;
        herb.position.set(Math.cos(angle) * 0.2, 0.2, Math.sin(angle) * 0.2);
        group.add(herb);
    }
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

/**
 * Create a Coffee model
 */
function createCoffee() {
    const group = new THREE.Group();
    
    // Cup
    const cupGeo = new THREE.CylinderGeometry(0.2, 0.15, 0.25, 16);
    const cupMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const cup = new THREE.Mesh(cupGeo, cupMat);
    group.add(cup);
    
    // Coffee
    const coffeeGeo = new THREE.CylinderGeometry(0.18, 0.13, 0.02, 16);
    const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3d2817 });
    const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
    coffee.position.y = 0.1;
    group.add(coffee);
    
    // Handle
    const handleGeo = new THREE.TorusGeometry(0.06, 0.015, 8, 12, Math.PI);
    const handle = new THREE.Mesh(handleGeo, cupMat);
    handle.position.set(0.2, 0, 0);
    handle.rotation.z = Math.PI / 2;
    group.add(handle);
    
    // Steam
    const steamMat = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.3 
    });
    for (let i = 0; i < 3; i++) {
        const steamGeo = new THREE.ConeGeometry(0.02, 0.1, 8);
        const steam = new THREE.Mesh(steamGeo, steamMat);
        steam.position.set(-0.05 + i * 0.05, 0.2, 0);
        group.add(steam);
    }
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

/**
 * Create a Smoothie model
 */
function createSmoothie() {
    const group = new THREE.Group();
    
    // Glass
    const glassGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.35, 16);
    const glassMat = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.3 
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    group.add(glass);
    
    // Smoothie
    const smoothieMat = new THREE.MeshStandardMaterial({ color: 0x9b59b6 });
    const smoothieGeo = new THREE.CylinderGeometry(0.11, 0.14, 0.28, 16);
    const smoothie = new THREE.Mesh(smoothieGeo, smoothieMat);
    smoothie.position.y = -0.02;
    group.add(smoothie);
    
    // Whipped cream
    const creamGeo = new THREE.SphereGeometry(0.08, 12, 8);
    const creamMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const cream = new THREE.Mesh(creamGeo, creamMat);
    cream.position.y = 0.18;
    group.add(cream);
    
    // Cherry
    const cherryGeo = new THREE.SphereGeometry(0.03, 8, 6);
    const cherryMat = new THREE.MeshStandardMaterial({ color: 0xc0392b });
    const cherry = new THREE.Mesh(cherryGeo, cherryMat);
    cherry.position.set(0.03, 0.25, 0);
    group.add(cherry);
    
    // Straw
    const strawGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.25, 8);
    const strawMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c });
    const straw = new THREE.Mesh(strawGeo, strawMat);
    straw.position.set(0.05, 0.1, 0);
    straw.rotation.z = -0.1;
    group.add(straw);
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

/**
 * Create an Iced Coffee model
 */
function createIcedCoffee() {
    const group = new THREE.Group();
    
    // Cup
    const cupGeo = new THREE.CylinderGeometry(0.15, 0.12, 0.3, 16);
    const cupMat = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.4 
    });
    const cup = new THREE.Mesh(cupGeo, cupMat);
    group.add(cup);
    
    // Coffee
    const coffeeMat = new THREE.MeshStandardMaterial({ color: 0x3d2817 });
    const coffeeGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.15, 16);
    const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
    coffee.position.y = -0.05;
    group.add(coffee);
    
    // Ice cubes
    const iceMat = new THREE.MeshStandardMaterial({ 
        color: 0xe8f8f5, 
        transparent: true, 
        opacity: 0.7 
    });
    for (let i = 0; i < 4; i++) {
        const iceGeo = new THREE.BoxGeometry(0.06, 0.06, 0.06);
        const ice = new THREE.Mesh(iceGeo, iceMat);
        ice.position.set(
            (Math.random() - 0.5) * 0.15,
            0.05 + Math.random() * 0.1,
            (Math.random() - 0.5) * 0.15
        );
        ice.rotation.set(Math.random(), Math.random(), Math.random());
        group.add(ice);
    }
    
    // Straw
    const strawGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.25, 8);
    const strawMat = new THREE.MeshStandardMaterial({ color: 0x2ecc71 });
    const straw = new THREE.Mesh(strawGeo, strawMat);
    straw.position.set(0.06, 0.08, 0);
    straw.rotation.z = -0.1;
    group.add(straw);
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

/**
 * Create a Fried Platter model
 */
function createFriedPlatter() {
    const group = new THREE.Group();
    
    // Platter
    const platterGeo = new THREE.CylinderGeometry(0.45, 0.4, 0.05, 24);
    const platterMat = new THREE.MeshStandardMaterial({ color: 0xecf0f1 });
    const platter = new THREE.Mesh(platterGeo, platterMat);
    group.add(platter);
    
    // Fried items
    const friedMat = new THREE.MeshStandardMaterial({ color: 0xd4a574 });
    
    // Chicken piece
    const chickenGeo = new THREE.SphereGeometry(0.12, 10, 8);
    chickenGeo.scale(1, 0.7, 0.9);
    const chicken = new THREE.Mesh(chickenGeo, friedMat);
    chicken.position.set(-0.15, 0.1, 0);
    group.add(chicken);
    
    // Fries
    for (let i = 0; i < 5; i++) {
        const fryGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 6);
        const fryMat = new THREE.MeshStandardMaterial({ color: 0xf4d03f });
        const fry = new THREE.Mesh(fryGeo, fryMat);
        fry.position.set(
            0.1 + Math.random() * 0.1,
            0.08 + Math.random() * 0.05,
            (Math.random() - 0.5) * 0.1
        );
        fry.rotation.z = (Math.random() - 0.5) * 0.3;
        fry.rotation.x = (Math.random() - 0.5) * 0.3;
        group.add(fry);
    }
    
    // Coleslaw
    const coleslawMat = new THREE.MeshStandardMaterial({ color: 0xffeb3b });
    const coleslawGeo = new THREE.SphereGeometry(0.1, 8, 6);
    coleslawGeo.scale(1.2, 0.6, 1);
    const coleslaw = new THREE.Mesh(coleslawGeo, coleslawMat);
    coleslaw.position.set(0, 0.1, 0.15);
    group.add(coleslaw);
    
    // Sauce
    const sauceGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 12);
    const sauceMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c });
    const sauce = new THREE.Mesh(sauceGeo, sauceMat);
    sauce.position.set(0.2, 0.04, -0.1);
    group.add(sauce);
    
    group.scale.set(0.35, 0.35, 0.35);
    return group;
}

// Register all food models
const FOOD_CREATORS = {
    burger: createBurger,
    pizza: createPizza,
    pasta: createPasta,
    'fried-chicken': createFriedChicken,
    salad: createSalad,
    skewers: createSkewers,
    juice: createJuice,
    wrap: createWrap,
    kebab: createKebab,
    roast: createRoast,
    coffee: createCoffee,
    smoothie: createSmoothie,
    'iced-coffee': createIcedCoffee,
    'fried-platter': createFriedPlatter
};

// Global exports for browser use
if (typeof window !== 'undefined') {
    window.FOOD_MODELS = FOOD_MODELS;
    window.FOOD_CREATORS = FOOD_CREATORS;
}
