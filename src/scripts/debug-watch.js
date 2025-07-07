import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const DEBOUNCE_TIME = 5000;
let buildTimeout;
let isBuilding = false;

const watchedDirs = ['src', 'public'];
const watchedFiles = ['index.html', 'vite.config.js', 'package.json'];

function debounceRebuild() {
  if (buildTimeout) {
    clearTimeout(buildTimeout);
  }
  
  buildTimeout = setTimeout(() => {
    if (!isBuilding) {
      runBuild();
    }
  }, DEBOUNCE_TIME);
}

function runBuild() {
  if (isBuilding) return;
  
  isBuilding = true;
  console.log('🔨 Building production...');
  
  const build = spawn('npm', ['run', 'build'], {
    stdio: 'inherit',
    shell: true
  });
  
  build.on('close', (code) => {
    isBuilding = false;
    if (code === 0) {
      console.log('✅ Build completed successfully');
    } else {
      console.log(`❌ Build failed with code ${code}`);
    }
  });
  
  build.on('error', (err) => {
    isBuilding = false;
    console.error('❌ Build error:', err);
  });
}

function watchDirectory(dir) {
  try {
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (filename && !filename.includes('node_modules') && !filename.includes('.git')) {
        console.log(`📁 ${eventType}: ${path.join(dir, filename)}`);
        debounceRebuild();
      }
    });
    console.log(`👀 Watching directory: ${dir}`);
  } catch (err) {
    console.error(`Failed to watch directory ${dir}:`, err);
  }
}

function watchFile(file) {
  try {
    fs.watch(file, (eventType, filename) => {
      console.log(`📄 ${eventType}: ${file}`);
      debounceRebuild();
    });
    console.log(`👀 Watching file: ${file}`);
  } catch (err) {
    console.error(`Failed to watch file ${file}:`, err);
  }
}

console.log('🚀 Starting debug watch mode...');
console.log(`⏱️  Debounce time: ${DEBOUNCE_TIME}ms`);

// Watch directories
watchedDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    watchDirectory(dir);
  }
});

// Watch individual files
watchedFiles.forEach(file => {
  if (fs.existsSync(file)) {
    watchFile(file);
  }
});

// Initial build
runBuild();

console.log('🎯 Debug watch mode started. Press Ctrl+C to stop.');
