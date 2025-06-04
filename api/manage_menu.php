<?php
require_once 'db.php';

$id = '';
$parent_id = '';
$keyword = '';
$description = '';
$url = '';
$isEdit = false;

// Handle Create / Update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? '';
    $parent_id = $_POST['parent_id'] ?: null;
    $keyword = trim($_POST['keyword']);
    $description = trim($_POST['description']);
    $url = trim($_POST['url']);

    if ($id) {
        $stmt = $pdo->prepare("UPDATE tb_botmenu SET parent_id = ?, keyword = ?, description = ?, url = ? WHERE id = ?");
        $stmt->execute([$parent_id, $keyword, $description, $url, $id]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO tb_botmenu (parent_id, keyword, description, url) VALUES (?, ?, ?, ?)");
        $stmt->execute([$parent_id, $keyword, $description, $url]);
    }

    header("Location: manage_menu.php");
    exit;
}

// Handle Delete
if (isset($_GET['delete'])) {
    $stmt = $pdo->prepare("DELETE FROM tb_botmenu WHERE id = ?");
    $stmt->execute([$_GET['delete']]);
    header("Location: manage_menu.php");
    exit;
}

// Handle Edit
if (isset($_GET['edit'])) {
    $stmt = $pdo->prepare("SELECT * FROM tb_botmenu WHERE id = ?");
    $stmt->execute([$_GET['edit']]);
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($data) {
        $id = $data['id'];
        $parent_id = $data['parent_id'];
        $keyword = $data['keyword'];
        $description = $data['description'];
        $url = $data['url'];
        $isEdit = true;
    }
}

// Ambil semua menu
$stmt = $pdo->query("SELECT * FROM tb_botmenu ORDER BY parent_id, id");
$menus = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Manajemen Menu Bot</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-6">
  <div class="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-xl">
    <h2 class="text-xl font-semibold mb-4"><?= $isEdit ? '✏️ Edit Menu' : '➕ Tambah Menu' ?></h2>
    <form method="POST" class="space-y-4">
      <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">

      <div>
        <label class="block font-medium">Parent Menu (kosong jika menu utama)</label>
        <select name="parent_id" class="w-full p-2 border rounded">
          <option value="">-- Menu Utama --</option>
          <?php foreach ($menus as $menu): ?>
            <?php if ($menu['parent_id'] === null): ?>
              <option value="<?= $menu['id'] ?>" <?= $menu['id'] == $parent_id ? 'selected' : '' ?>>
                <?= htmlspecialchars($menu['description']) ?> (<?= htmlspecialchars($menu['keyword']) ?>)
              </option>
            <?php endif; ?>
          <?php endforeach; ?>
        </select>
      </div>

      <div>
        <label class="block font-medium">Keyword</label>
        <input type="text" name="keyword" value="<?= htmlspecialchars($keyword) ?>" class="w-full p-2 border rounded" required />
      </div>

      <div>
        <label class="block font-medium">Deskripsi</label>
        <input type="text" name="description" value="<?= htmlspecialchars($description) ?>" class="w-full p-2 border rounded" required />
      </div>

      <div>
        <label class="block font-medium">URL (jika ada)</label>
        <input type="text" name="url" value="<?= htmlspecialchars($url) ?>" class="w-full p-2 border rounded" />
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        <?= $isEdit ? 'Simpan Perubahan' : 'Tambah Menu' ?>
      </button>

      <?php if ($isEdit): ?>
        <a href="manage_menu.php" class="ml-4 text-gray-600 hover:underline">Batal Edit</a>
      <?php endif; ?>
    </form>
  </div>

  <div class="max-w-4xl mx-auto mt-8 bg-white shadow-md p-6 rounded-xl">
    <h2 class="text-xl font-semibold mb-4">📋 Daftar Menu</h2>
    <table class="w-full table-auto border border-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-2 py-1 text-left">ID</th>
          <th class="border px-2 py-1 text-left">Parent</th>
          <th class="border px-2 py-1 text-left">Keyword</th>
          <th class="border px-2 py-1 text-left">Deskripsi</th>
          <th class="border px-2 py-1 text-left">URL</th>
          <th class="border px-2 py-1 text-left">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($menus as $m): ?>
          <tr class="hover:bg-gray-50">
            <td class="border px-2 py-1"><?= $m['id'] ?></td>
            <td class="border px-2 py-1"><?= $m['parent_id'] ?? '—' ?></td>
            <td class="border px-2 py-1 font-mono"><?= htmlspecialchars($m['keyword']) ?></td>
            <td class="border px-2 py-1"><?= htmlspecialchars($m['description']) ?></td>
            <td class="border px-2 py-1 text-sm truncate"><?= htmlspecialchars($m['url']) ?></td>
            <td class="border px-2 py-1 space-x-2">
              <a href="?edit=<?= $m['id'] ?>" class="text-blue-600 hover:underline">Edit</a>
              <a href="?delete=<?= $m['id'] ?>" onclick="return confirm('Yakin ingin menghapus?')" class="text-red-600 hover:underline">Hapus</a>
            </td>
          </tr>
        <?php endforeach ?>
      </tbody>
    </table>
  </div>
</body>
</html>
