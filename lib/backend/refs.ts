import path from 'path';
import fs from 'fs';
import { Commit } from './types';
import { readObject } from './object';

type BranchType = 0 | 1;
const branchTypes = [
  'locals',
  'remotes'
];
let commitRefPath = 'commit';
let headRefPath = 'head';
let branchesPath = 'branches';

function refsInit(repositoryPath: string) {
  headRefPath = path.join(repositoryPath, 'head');
  commitRefPath = path.join(repositoryPath, 'commit');
  branchesPath = path.join(repositoryPath, 'branches');
}

function getCommitRef(): string {
  return fs.readFileSync(commitRefPath, 'utf-8').toString();
}
function setCommitRef(hash: string) {
  fs.writeFileSync(commitRefPath, hash, 'utf-8');
}

function getHead() {
  return fs.readFileSync(headRefPath, 'utf-8').toString();
}
function setHead(branchName: string) {
  fs.writeFileSync(headRefPath, branchName, 'utf-8');
}
function findHead(branchType: BranchType, hash: string) {
  //get list of head-hash and change it to map structure
  const branches = getBranches(branchType);
  for (let branch of branches) {
    if (readBranch(branchType, branch) === hash) {
      return branch;
    }
  }
  return "";
}

function getBranches(branchType: BranchType) {
  const branches = fs.readdirSync(path.join(branchesPath, branchTypes[branchType]));
  return branches;
}
function readBranch(branchType: BranchType, branchName: string) { 
  const branchPath = path.join(branchesPath, branchTypes[branchType], branchName);
  return fs.readFileSync(branchPath, 'utf-8').toString();
}
function createBranch(branchType: BranchType, branchName: string, hash: string) { 
  const branchPath = path.join(branchesPath, branchTypes[branchType], branchName);
  fs.mkdirSync(path.dirname(branchPath), { recursive: true });
  fs.writeFileSync(branchPath, hash);
}
// function removeBranch(branchType: BranchType, branchName: string) { }
function setBranch(branchType: BranchType, branchName: string, hash: string) { 
  const branchPath = path.join(branchesPath, branchTypes[branchType], branchName);
  if (!fs.existsSync(branchPath)) {
    console.log('(setBranch) branch does not exist');
    return;
  }
  createBranch(branchType, branchName, hash);
}

function updateCurrentBranch() {
  const commitHash = getCommitRef();
  let head = getHead();

  if (!head) {
    //create new branch. If there isn't branch, that means commit hash is unique, so it can be used as branch name
    createBranch(0, commitHash, commitHash);
    setHead(commitHash);
    head = commitHash;
  } else {
    setBranch(0, head, commitHash);
  }
}

function handleCheckout(hash: string) { 
  //find commit hash value that match with hash
  if (!readObject(hash)) {
    console.log('target commit object does not exist');
    return;
  }
  setCommitRef(hash);
  //find branch for this hash
  setHead(findHead(0, hash));
}

export { refsInit, handleCheckout };